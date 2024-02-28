import mongoose, { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  githubID: string;
  githubUserName: string;
  accessToken: string;
  isComplete: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    githubID: { type: String, required: true, unique: true },
    githubUserName: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true, unique: true },
    isComplete: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.models.User ?? model<IUser>("User", UserSchema);
