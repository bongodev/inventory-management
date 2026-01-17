import z from 'zod';
import bcrypt from 'bcrypt';

import { CreateUserSchema } from '@/schemas';
import { UserModel } from './model';
import { envConfig } from '@/config';
import { User } from '@/types';

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

export const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email }).select('_id name email passwordHash role deleted');
};

export const verifyPassword = async (user: User, password: string) => {
  return bcrypt.compare(password, user.passwordHash);
};
