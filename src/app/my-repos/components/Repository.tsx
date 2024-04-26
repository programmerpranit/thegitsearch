"use client";

import type { RepoType } from "@/types/mongo";
import { Github } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function Repository({ repo }: { repo: RepoType }): JSX.Element {
  const router = useRouter();

  return (
    <div className=" mt-3 flex w-full max-w-7xl items-center justify-between rounded-md border p-4">
      <div
        onClick={() => {
          router.push(`/repo/${repo._id}`);
        }}
        className="cursor-pointer"
      >
        <h4>{repo?.name}</h4>
        <h5 className="w-fit rounded-full bg-green-100 px-3">
          {repo?.language}
        </h5>
        {/* <p>{repo?.description}</p> */}
        <div className="flex flex-wrap">
          {repo?.packages?.map((p) => (
            <h5 className="mr-2" key={p}>
              {p}
            </h5>
          ))}
        </div>
      </div>

      <div className="flex gap-4 self-start">
        <a href={`https://github.com/${repo.name}`}>
          <Github />
        </a>
      </div>
    </div>
  );
}

export default Repository;
