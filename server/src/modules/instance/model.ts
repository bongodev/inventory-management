import mongoose from 'mongoose';

import { Instance } from '@/types';
import { softDeletePlugin } from '@/common/mongoose-plugins';

const instanceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subDomain: { type: String },
  },
  {
    timestamps: true,
  },
);
instanceSchema.plugin(softDeletePlugin);

export type InstanceDocument = Instance & mongoose.Document;

export const InstanceModel = mongoose.model<InstanceDocument>(
  'Instance',
  instanceSchema,
);
