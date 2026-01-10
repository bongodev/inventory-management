import { z } from "zod";

import { DateMixin } from "./mixin";

export const UserRoleEnum = z.enum(["admin", "shop-keeper"]);

export const UserSchema = z.object({
  ...DateMixin.shape,
  _id: z.string(),
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  passwordHash: z.string(),
  isDraft: z.boolean().optional().default(false),
  role: UserRoleEnum,
});
