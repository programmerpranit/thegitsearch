"use server"
import connectToDB from "@/middleware/connectToDB";
import { verifyUser } from "@/middleware/verifyToken";
import { Repo } from "@/models/Repo";
import type { RepoType } from "@/types/mongo";

/**
 * Updates a repository with the specified information.
 * @param _id - The ID of the repository to update.
 * @param name - The new name of the repository.
 * @param language - The new language of the repository.
 * @param framework - The new framework of the repository.
 * @param description - The new description of the repository.
 * @param tags - The new tags of the repository.
 * @param packages - The new packages of the repository.
 * @returns A Promise that resolves to the updated repository, or null if the user is not authenticated.
 */
export const updateRepo = async (
  _id: string,
  name: string,
  language: string,
  framework: string,
  description: string,
  tags: string[],
  packages: string[]
): Promise<RepoType | null> => {
  const user = verifyUser();
  if (user === null) return null;
  await connectToDB();
  const repo: RepoType | null = await Repo.findByIdAndUpdate(_id, {
    name,
    language,
    framework,
    description,
    tags,
    packages,
    addedBy: user._id,
  });
  return JSON.parse(JSON.stringify(repo));
};

/**
 * Retrieves all repositories added by the authenticated user.
 * @returns A Promise that resolves to an array of repositories added by the user.
 * @throws Error if the user is not authenticated.
 */
export const getMyRepos = async (): Promise<RepoType[]> => {
  const user = verifyUser();
  if (user === null) throw Error("Unauthorized");
  await connectToDB();
  const repos = await Repo.find({ addedBy: user._id });
  return JSON.parse(JSON.stringify(repos));
};
