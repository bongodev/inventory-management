import { CreateInstance } from "@/types";
import { InstanceModel } from "@/modules/instance";

export const createInstance = async (instancePayload: CreateInstance) => {
  const newInstance = await InstanceModel.create(instancePayload);
  return newInstance;
};
