"use server";

import { Repo } from "@/models/Repo";
import { verifyUser } from "@/middleware/verifyToken";
import connectToDB from "@/middleware/connectToDB";
import type { RepoType } from "@/types/mongo";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

export const detectFramework = async (packages: string[]): Promise<string> => {
  const apiKey = process.env.GEMINI;
  if (apiKey === undefined) throw Error("API Key Not Defined");
  // const projectId = "mini-project-1644337227279";

  // const maxTokens = 100; // Optional: Maximum number of tokens to generate
  // const temperature = 0.5; // Optional: Adjusts creativity/safety (0.0 = cautious, 1.0 = adventurous)

  const prompt = `I will provide you a list of npm packages based on that detect the Javascript/Typescript framework used in that project return Unknown if any framework is not detected. If any project has next package it will be a mostly Nextjs Framework. Return Framework name in camelcase and avoid spaces and return only one framework name. The Packages List is ${packages.join(" ")}`;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const response = (await model.generateContent(prompt)).response;
  const text = response.text();
  console.log(text);
  return text;
};
