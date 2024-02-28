"use client";

import axios from "axios";
import React, { type FormEvent, useState } from "react";

const AddRepoPage = (): JSX.Element => {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [repoDetails, setRepoDetails] = useState<any | null>(null);

  const [dependencies, setDependencies] = useState<string[]>([]);

  const getUserNameRepo = (url: string): { user: string; repo: string } => {
    const splitted = url.split("/");
    return { user: splitted[3], repo: splitted[4] };
  };

  const fetchPackages = async (
    user: string,
    repo: string,
    lang: string
  ): Promise<void> => {
    try {
      console.log(lang);
      // if (lang === "JavaScript") {
      console.log("Fetching");
      const url = `https://raw.githubusercontent.com/${user}/${repo}/main/package.json`;
      const res = await axios.get(url);
      console.log(res);
      const dep = Object.keys(res.data.dependencies);

      console.log(dep);

      setDependencies(dep);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const getRepoDetails = async (user: string, repo: string): Promise<void> => {
    try {
      const url = `https://api.github.com/repos/${user}/${repo}`;
      const res = await axios.get(url);
      setRepoDetails(res.data);
      console.log("This is Get Repo Details Data", res.data);
      await fetchPackages(user, repo, res.data.language);
      console.log(res);
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
          className="flex items-center gap-5"
        >
          <input
            value={repoUrl}
            onChange={(e) => {
              setRepoUrl(e.target.value);
            }}
            type="text"
            className="inp w-full"
            placeholder="https://github.com/programmerpranit/pranitpatil.git"
          />
          <button className="bg-primary">Fetch</button>
        </form>

        <div className="my-10 w-full rounded-xl border-2 p-5">
          <h3>Repo Details</h3>

          <p>
            <strong> Repo Name:</strong> {repoDetails?.name}
          </p>
          <p>
            <strong> Description:</strong> {repoDetails?.description}
          </p>
          <p>
            <strong>Language Used:</strong> {repoDetails?.language}
          </p>
          <div>
            <div className="flex gap-3">
              <strong>Topics:</strong>
              {repoDetails?.topics.map((t: string) => <p key={t}>{t},</p>)}
            </div>
          </div>

          <div>
            <div className="">
              <strong>Packages/Modules Used</strong>
              {dependencies.map((t: string) => (
                <p key={t}>{t},</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRepoPage;
