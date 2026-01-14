import { z } from "zod";
import { CreatedMixin, SoftDeleteMixin, UpdatedMixin } from "./mixin";

export const InstanceSchema = z.object({
  ...CreatedMixin.shape,
  ...UpdatedMixin.shape,
  ...SoftDeleteMixin.shape,

  _id: z.string(),
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  subDomain: z
    .string()
    .min(1, "Subdomain is required")
    .max(100, "Subdomain is too long"),
});
