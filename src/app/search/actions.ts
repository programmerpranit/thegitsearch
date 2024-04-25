import { Repo } from "@/models/Repo";
import type { FilterQuery } from "mongoose";

export const searchRepo = async (
  language: string,
  framework: string,
  packages: string[],
  text: string
): Promise<any> => {
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

    if (text !== "") {
      query.$text = { $search: text };
    }

    const results = await Repo.find(query);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
};
