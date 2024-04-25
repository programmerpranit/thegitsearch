'use client'
import { getRepoDetails } from "@/app/search/actions";
import React, { useEffect, useState } from "react";
import Repository from "../components/Repository";

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
function Page({ params }: { params: { id: string } }): JSX.Element {
  const [repoData, setRepoData] = useState<Repo>();

  const getRepo = async (): Promise<void> => {
    try {
      const res = await getRepoDetails(params.id);
      setRepoData(res); // Assuming your API returns the repo details
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id != null) {
      getRepo();
    }
  }, [params.id]);
  return (
    <div className="flex w-[75%] flex-col self-center ">
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
