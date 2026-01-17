import { z } from 'zod';
import { UserRoleEnum, UserSchema } from '@/schemas';

export type UserRole = z.infer<typeof UserRoleEnum>;

export type User = z.infer<typeof UserSchema>;
