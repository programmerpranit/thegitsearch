import { Schema, model, type ObjectId } from "mongoose";
import mongoose from "mongoose";
export interface IRepo {
  name: string;
  language: string;
  framework: string;
  description: string;
  tags: string[];
  packages: string[];
  addedBy: ObjectId;
}

const RepoSchema = new Schema<IRepo>(
  {
    name: { type: String, required: true, unique: true },
    language: { type: String, required: true },
    framework: { type: String, required: true },
    description: { type: String, required: true, default: "" },
    tags: [String],
    packages: [String],
    addedBy: { type: Schema.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

mongoose.models = {};

export const Repo = mongoose.models.Repo ?? model<IRepo>("Repo", RepoSchema);
