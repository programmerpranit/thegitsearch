"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getRepoDetails } from "../search/actions";
import type { RepoType } from "@/types/mongo";

function Page(): JSX.Element {
  const [repoData, setRepoData] = useState<RepoType>();
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
      void getRepo();
    }
  }, [repoId]);

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-center">
      <div className="flex items-center justify-between self-center">
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
