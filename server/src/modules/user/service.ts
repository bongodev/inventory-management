import z from 'zod';
import bcrypt from 'bcrypt';

import { CreateUserSchema } from '@/schemas';
import { UserModel } from './model';
import { envConfig } from '@/config';

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
  return UserModel.findOne({ email });
};
