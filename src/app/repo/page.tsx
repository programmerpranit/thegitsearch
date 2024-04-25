"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getRepoDetails } from "../search/actions";
import Repository from "../my-repos/components/Repository";
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
function Page(): JSX.Element {
  const [repoData, setRepoData] = useState<Repo>();
  const searchParams = useSearchParams();

  const repoId: string | null = searchParams.get("id");

  const getRepo = async (): Promise<void> => {
    try {
      const res = await getRepoDetails(repoId);
      setRepoData(res); // Assuming your API returns the repo details
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (repoId != null) {
      getRepo();
    }
  }, [repoId]);

  return (
    <div className="w-[75%] flex self-center flex-col " >
      
        <Repository repo={repoData} />
        <h4>{repoData?.description}</h4>
        <h4>{repoData?.framework}</h4>
        <h4>{repoData?.language}</h4>
        <h4>{repoData?.tags}</h4>
        <h4>{repoData?.packages}</h4>
        <h4>{repoData?.updatedAt}</h4>
    </div>
  );
}

export default Page;
