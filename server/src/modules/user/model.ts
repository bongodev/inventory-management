import mongoose from "mongoose";

import { User } from "@/types";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    isDraft: { type: Boolean, default: false },
    role: { type: String, enum: ["admin", "shop-keeper"], required: true },
  },
  {
    timestamps: true,
  }
);

export type UserDocument = User & mongoose.Document;

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
