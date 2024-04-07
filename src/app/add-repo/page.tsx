import React from "react";
import AddRepoPage from "./AddRepo";
import { getUsername } from "@/helpers/github";
import type { Repo } from "@/types/github";

const AddRepo = async (): Promise<JSX.Element> => {
  const getUserRepos = async (): Promise<Repo[]> => {
    const username = getUsername();
    console.log(username);
    const data = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await data.json();
    // const repoNames = repos.map((repo: any) => repo.name);
    console.log(repos);
    return repos as Repo[];
  };

  const repos = await getUserRepos();

  return (
    <>
      <AddRepoPage userRepos={repos} />
    </>
  );
};

export default AddRepo;
