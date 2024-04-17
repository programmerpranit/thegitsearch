"use server";

import { Repo } from "@/models/Repo";
import { verifyUser } from "@/middleware/verifyToken";

export const addRepo = async (
  name: string,
  language: string,
  framework: string,
  description: string,
  tags: string[],
  packages: string[]
): Promise<void> => {
  const user = verifyUser();
  if (user === null) return;

  await connectToDB();
  const repo = await Repo.create({
    name,
    language,
    framework,
    description,
    tags,
    packages,
    addedBy: user._id,
  });
};
