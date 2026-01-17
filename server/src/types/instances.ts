import { z } from "zod";
import { InstanceSchema,CreateInstanceSchema } from "@/schemas";

export type Instance = z.infer<typeof InstanceSchema>;
export type CreateInstance = z.infer<typeof CreateInstanceSchema>;
