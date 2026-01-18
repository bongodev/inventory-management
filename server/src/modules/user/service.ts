import z from 'zod';
import bcrypt from 'bcrypt';

import { CreateUserSchema } from '@/schemas';
import { UserModel } from './model';
import { envConfig } from '@/config';
import { UpdateUser, User } from '@/types';

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

export const deleteUserById = async (_id: string) => {
  const user = await UserModel.findById(_id);

  if (!user) return false;

  return UserModel.findByIdAndUpdate(
    _id,
    {
      deleted: true,
      deletedAt: new Date().toISOString(),
    },
    {
      new: true,
    },
  );
};

export const restoreUser = async (_id: string) => {
  const user = await UserModel.findById(_id);

  if (!user) return false;

  return UserModel.findByIdAndUpdate(
    _id,
    {
      deleted: false,
      deletedAt: null,
    },
    {
      new: true,
    },
  );
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
}