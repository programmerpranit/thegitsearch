"use server";

import { Repo } from "@/models/Repo";
import { verifyUser } from "@/middleware/verifyToken";
import connectToDB from "@/middleware/connectToDB";
import type { RepoType } from "@/types/mongo";

export const addRepo = async (
  name: string,
  language: string,
  framework: string,
  description: string,
  tags: string[],
  packages: string[]
): Promise<RepoType | null> => {
  try {
    const user = verifyUser();
    if (user === null) return null;

    await connectToDB();
    const repo: RepoType = await Repo.create({
      name,
      language,
      framework,
      description,
      tags,
      packages,
      addedBy: user._id,
    });

    return JSON.parse(JSON.stringify(repo));
  } catch (e) {
    console.log(e);
    return null;
  }
};
