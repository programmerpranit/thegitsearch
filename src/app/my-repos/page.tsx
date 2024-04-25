"use client";
import React, { useEffect, useState } from "react";
import { getMyRepos } from "./actions";
import Repository from "./components/Repository";
import { useRouter } from "next/navigation";
interface Repo {
  _id: string;
  name: string;
  language: string;
  framework: string;
  description: string;
  tags: string[];
  packages: string[];
  addedBy: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  __v: number;
}
const Page = (): JSX.Element => {
  const [userRepos, setUserRepos] = useState<Repo[]>();
  const router = useRouter();

  const getRepos = async (): Promise<void> => {
    try {
      const res = await getMyRepos();
      console.log(res);
      setUserRepos(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void getRepos();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-2 text-center">My Repositories</h2>
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start  justify-center gap-2">
        {userRepos?.map((repo) => (
          <div
            onClick={() => {
              router.push(`/my-repos/${repo._id}`);
            }}
            className="w-full"
            key={repo._id}
          >
            <Repository repo={repo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
