import { z } from 'zod';

import { CreatedMixin, SoftDeleteMixin, UpdatedMixin } from './mixin';

export const UserRoleEnum = z.enum(['admin', 'shop-keeper']);

export const UserSchema = z.object({
  ...CreatedMixin.shape,
  ...UpdatedMixin.shape,
  ...SoftDeleteMixin.shape,
  _id: z.string(),
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  passwordHash: z.string(),
  isDraft: z.boolean().optional().default(false),
  role: UserRoleEnum,
});

export const CreateUserSchema = UserSchema.pick({
  name: true,
  email: true,
}).extend({
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
