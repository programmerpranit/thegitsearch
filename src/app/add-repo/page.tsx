import React from "react";
import AddRepoPage from "./AddRepo";
import { getUsername } from "@/helpers/github";
import type { Repo } from "@/types/github";

const AddRepo = async (): Promise<JSX.Element> => {
  const getUserRepos = async (): Promise<Repo[]> => {
    return [];
    const username = getUsername();
    console.log(username);
    const data = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_G_TOKEN}`,
      },
    });
    console.log(data);
    const repos: Repo[] = await data.json();
    console.log(repos);
    // const repoNames = repos.map((repo: any) => repo.name);
    const allRepos: Repo[] = [];
    repos.forEach((repo) => {
      if (repo.language === "TypeScript" || repo.language === "JavaScript") {
        allRepos.push(repo);
      }
    });
    console.log(allRepos);
    // console.log(repos);
    return allRepos;
  };

  const repos = await getUserRepos();

  return (
    <>
      <AddRepoPage userRepos={repos} />
    </>
  );
};

export default AddRepo;
