"use server";

import { Repo } from "@/models/Repo";
import type { RepoType } from "@/types/mongo";
import type { FilterQuery } from "mongoose";

/**
 * Searches for repositories based on the specified criteria.
 * @param language - The programming language of the repositories.
 * @param framework - The framework used by the repositories.
 * @param packages - An array of packages required by the repositories.
 * @returns A promise that resolves to an array of repositories matching the criteria.
 * @throws If an error occurs during the search process.
 */
export const searchRepo = async (
  language: string,
  framework: string,
  packages: string[]
): Promise<RepoType[]> => {
  try {
    const query: FilterQuery<any> = {};

    if (language !== "") {
      query.language = language;
    }

    if (framework !== "") {
      query.framework = framework;
    }

    if (packages.length > 0) {
      query.packages = { $in: packages };
    }

    // if (text !== "") {
    //   query.$text = { $search: text };
    // }

    const results = await Repo.find({ language: "TypeScript" });

    console.log(results);
    return JSON.parse(JSON.stringify(results));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Retrieves the latest repositories.
 * @param count The number of repositories to retrieve. Default is 10.
 * @returns A promise that resolves to an array of RepoType objects.
 */
export const getLatestRepos = async (
  count: number = 10
): Promise<RepoType[]> => {
  const repos = await Repo.find().limit(count);
  return JSON.parse(JSON.stringify(repos));
};

/**
 * Retrieves the details of a repository.
 * @param repoId - The ID of the repository.
 * @returns A Promise that resolves to the repository details or null if not found.
 */
export const getRepoDetails = async (
  repoId: string
): Promise<RepoType | null> => {
  const repo: RepoType | null = await Repo.findById(repoId);
  return JSON.parse(JSON.stringify(repo));
};
