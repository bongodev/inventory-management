import { z } from "zod";
import { InstanceSchema } from "@/schemas";

export type Instance = z.infer<typeof InstanceSchema>;
