import mongoose from 'mongoose';

export const softDeleteMixinSchema = {
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  deletedBy: { type: String, default: null },
};

export const createdMixinSchema = {
  createdBy: { type: String, default: null },
};

export const updatedMixinSchema = {
  updatedBy: { type: String, default: null },
};

export const softDeletePlugin = (schema: mongoose.Schema) => {
  schema.add(softDeleteMixinSchema);
  schema.methods.softDelete = function (deletedBy: string | null = null) {
    this.deleted = true;
    this.deletedAt = new Date();
    this.deletedBy = deletedBy;
  };
  schema.methods.restore = function () {
    this.deleted = false;
    this.deletedAt = null;
    this.deletedBy = null;
  };
};
