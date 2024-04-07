"use client";

import axios from "axios";
import React, { type FormEvent, useState } from "react";
import { toast } from "react-toastify";
import RepoDetails from "./RepoDetails";
import type { Repo } from "@/types/github";

const AddRepoPage = ({ userRepos }: { userRepos: Repo[] }): JSX.Element => {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [repoDetails, setRepoDetails] = useState<Repo | null>(null);
  const [suggestions, setSuggestions] = useState<boolean>(true);

  const getUserNameRepo = (url: string): { user: string; repo: string } => {
    const splitted = url.split("/");
    return { user: splitted[3], repo: splitted[4] };
  };

  const checkAndSetRepo = (repo: Repo): void => {
    if (repo.language !== "TypeScript" && repo.language !== "JavaScript") {
      toast.error(
        "The language for the repo should be Typescript or Javascript"
      );
      return;
    }
    setRepoDetails(repo);
    setSuggestions(false);
  };

  const getRepoDetails = async (user: string, repo: string): Promise<void> => {
    try {
      const url = `https://api.github.com/repos/${user}/${repo}`;
      const res = await axios.get(url);
      checkAndSetRepo(res.data as Repo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const { user, repo } = getUserNameRepo(repoUrl);
    void getRepoDetails(user, repo);
  };

  return (
    <>
      <div className="mx-auto max-w-6xl p-5">
        <h2>Add Repo</h2>
        <p className="font-semibold">Enter Url of Public Repo</p>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="relative h-screen"
        >
          <div className="flex items-center gap-5">
            <input
              onFocus={() => {
                setSuggestions(true);
              }}
              onBlur={() => {
                setSuggestions(false);
              }}
              value={repoUrl}
              onChange={(e) => {
                setRepoUrl(e.target.value);
              }}
              type="text"
              className="inp w-full"
              placeholder="https://github.com/programmerpranit/pranitpatil.git"
            />
            <button className="bg-primary">Fetch</button>
          </div>
          {suggestions && (
            <div className="absolute mb-1 max-h-[400px] w-2/3 overflow-scroll rounded border bg-white p-3">
              {userRepos.map((repo) => (
                <div
                  onClick={() => {
                    checkAndSetRepo(repo);
                  }}
                  key={repo.name}
                  className="mt-2 cursor-pointer scroll-smooth rounded border p-2"
                >
                  <div className="flex items-center justify-between">
                    <p>{repo.name}</p>
                    <p className="rounded-full bg-green-500 px-2 py-1 text-sm text-white">
                      {repo.language}
                    </p>
                  </div>
                  <p className="text-sm">{repo.html_url}</p>
                </div>
              ))}
            </div>
          )}
        </form>

        <RepoDetails details={repoDetails} />
      </div>
    </>
  );
};

export default AddRepoPage;
