import { Request } from 'express';
import z from 'zod';
import bcrypt from 'bcrypt';
import type { QueryFilter } from 'mongoose';

import { CreateUserSchema, SearchUserFilterSchema } from '@/schemas';
import { envConfig } from '@/config';
import { PageResult, UpdateUser, User } from '@/types';

import { UserDocument, UserModel } from './model';
import { ForbiddenError, NotFoundError } from '@/common/errors';

export const getHashedPassword = async (password: string) =>
  bcrypt.hash(password, envConfig.BCRYPT_SALT_ROUNDS);

export const createUser = async (
  userPayload: z.infer<typeof CreateUserSchema>,
) => {
  const hashedPassword = await getHashedPassword(userPayload.password);

  const newUser = await UserModel.create({
    name: userPayload.name,
    email: userPayload.email,
    passwordHash: hashedPassword,
    role: 'shop-keeper',
    isDraft: true,
  });

  return newUser;
};

export const getUsers = async () => {
  return await UserModel.find();
};

export const updateUserById = async (
  _id: string,
  updatedUserPayload: UpdateUser,
) => {
  const user = await UserModel.findById(_id);
  if (!user) return false;

  const payload = { ...updatedUserPayload };

  if (payload.password) {
    payload.passwordHash = await getHashedPassword(payload.password);
    delete payload.password;
  }

  return await UserModel.findByIdAndUpdate(_id, payload, {
    new: true,
  });
};

export const deleteUser = async (_id: string, reqUser: Request['user']) => {
  const user = await UserModel.findById(_id);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  if (!reqUser) {
    throw new ForbiddenError('Unauthorized');
  }

  await user.softDelete(reqUser?._id);
};

export const restoreUser = async (_id: string) => {
  const user = await UserModel.findOne({
    _id,
    deleted: true,
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  await user.restore();
};

export const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email }).select(
    '_id name email passwordHash role deleted',
  );
};

export const verifyPassword = async (user: User, password: string) => {
  return bcrypt.compare(password, user.passwordHash);
};

export const getUserById = async (id: string) => {
  return UserModel.findById(id).exec(); // here exec() returns a Promise
};

export const searchUsers = async (
  filters: z.infer<typeof SearchUserFilterSchema>,
): Promise<PageResult<User>> => {
  let query: QueryFilter<UserDocument> = {
    deleted: { $ne: true },
  };

  const searchQuery = filters.searchQuery?.trim();
  if (searchQuery) {
    query = {
      ...query,
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
      ],
    };
  }

  const skip = (filters.offset - 1) * filters.limit;
  const limit = filters.limit;

  const [users, total] = await Promise.all([
    UserModel.find(query).skip(skip).limit(limit),
    UserModel.countDocuments(query),
  ]);

  return {
    data: users,
    total,
    offset: filters.offset,
    limit: filters.limit,
  };
};
