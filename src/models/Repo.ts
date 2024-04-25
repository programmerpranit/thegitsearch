import mongoose, { Schema, model, type ObjectId } from "mongoose";

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

// RepoSchema.index(
//   {
//     language: "text",
//     framework: "text",
//     packages: "text",
//     description: "text",
//     tags: "text",
//   },
//   {
//     weights: {
//       language: 5,
//       framework: 5,
//       packages: 4,
//       description: 2,
//       tags: 3,
//     },
//   }
// );

// mongoose.models = {};

export const Repo = mongoose.models.Repo ?? model<IRepo>("Repo", RepoSchema);
