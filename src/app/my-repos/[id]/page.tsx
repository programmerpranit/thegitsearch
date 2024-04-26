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
    <div className="flex items-center justify-center">
      <div className="flex w-[75%] items-center justify-between self-center">
        {/* <Repository repo={repoData} /> */}
        <div>
          <h4>
            Repo Name <p>{repoData?.name}</p>{" "}
          </h4>
          <div className="flex flex-col">
            <h4>Description</h4>
            <p>{repoData?.description}</p>
          </div>
          <h4>
            Framework: <p>{repoData?.framework}</p>{" "}
          </h4>
          <h4>
            Language: <p>{repoData?.language}</p>{" "}
          </h4>
          <h4>
            Tags: <p>{repoData?.tags}</p>{" "}
          </h4>
          <h4>
            Updated At <p>{repoData?.updatedAt}</p>{" "}
          </h4>
        </div>
        <div>
          <h4>Packages Name</h4>
          <>
            {repoData?.packages.map((packageName, index) => (
              <p key={index} className="text-sm">
                {packageName}
              </p>
            ))}
          </>
        </div>
      </div>
    </div>
  );
}

export default Page;
