import z from 'zod';

import { CreateInstance, Instance, PageResult, UpdateInstance } from '@/types';
import { InstanceDocument, InstanceModel } from '@/modules/instance';
import { SearchInstanceFilterSchema } from '@/schemas';
import { QueryFilter } from 'mongoose';

export const createInstance = async (instancePayload: CreateInstance) => {
  const newInstance = await InstanceModel.create(instancePayload);
  return newInstance;
};

export const getInstances = async () => {
  return await InstanceModel.find();
};

export const getInstancesById = async (_id: string) => {
  const instance = await InstanceModel.findById(_id);

  if (!instance) return false;

  return instance;
};

export const updateInstanceById = async (
  _id: string,
  updateInstancePayload: UpdateInstance,
) => {
  const updatedInstance = await InstanceModel.findByIdAndUpdate(
    _id,
    updateInstancePayload,
    {
      new: true,
    },
  );

  if (!updatedInstance) return false;

  return updatedInstance;
};

export const deleteInstanceById = async (_id: string) => {
  const deletedInstance = await InstanceModel.findByIdAndUpdate(_id, {
    deleted: true,
    deletedAt: new Date().toISOString(),
  });

  if (!deletedInstance || deletedInstance.deleted) return false;

  return deletedInstance;
};

export const restoreInstance = async (_id: string) => {
  const restoredInstance = await InstanceModel.findById(_id);

  if (!restoredInstance) return false;

  return await InstanceModel.findByIdAndUpdate(
    _id,
    {
      deleted: false,
      deletedAt: null,
    },
    { new: true },
  );
};

export const searchInstance = async (
  filters: z.infer<typeof SearchInstanceFilterSchema>,
): Promise<PageResult<Instance>> => {
  let query: QueryFilter<InstanceDocument> = {
    deleted: false,
  };

  const searchQuery = filters.searchQuery?.trim();
  if (searchQuery) {
    query = {
      ...query,
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { subDomain: { $regex: searchQuery, $options: 'i' } },
      ],
    };
  }

  const skip = (filters.offset - 1) * filters.limit;
  const limit = filters.limit;

  const [instances, total] = await Promise.all([
    InstanceModel.find(query).skip(skip).limit(limit),
    InstanceModel.countDocuments(query),
  ]);

  return {
    data: instances,
    total,
    offset: filters.offset,
    limit: filters.limit,
  };
};
