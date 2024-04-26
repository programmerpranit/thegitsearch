import { getRepoDetails } from "@/app/search/actions";
import Link from "next/link";
import React from "react";

const RepoDeatail = async ({
  params: { id },
}: {
  params: { id: string };
}): Promise<JSX.Element> => {
  console.log(id);

  const repoData = await getRepoDetails(id);

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between self-center">
      {/* <Repository repo={repoData} /> */}
      <div className="mt-10 w-1/2">
        <a href={`https://github.com/${repoData?.name}`}>
          <h3>{repoData?.name}</h3>
        </a>
        <p>{repoData?.description}</p>

        <h4>
          Framework: <span className="font-medium">{repoData?.framework}</span>{" "}
        </h4>
        <h4>
          Language: <span className="font-medium">{repoData?.language}</span>{" "}
        </h4>
        <h4>Tags: </h4>
        <div className="flex flex-wrap gap-2">
          {repoData?.tags.map((tag) => <p key={tag}>{tag}</p>)}
        </div>
        <br />
        <h4>Packages Used</h4>
        <div className="flex flex-wrap gap-3">
          {repoData?.packages.map((packageName, index) => (
            <p key={index} className="rounded bg-gray-200 px-2 py-1 text-sm">
              {packageName}
            </p>
          ))}
        </div>
        <br />
        <h4>
          Updated At <p>{repoData?.updatedAt}</p>{" "}
        </h4>
      </div>
    </div>
  );
};

export default RepoDeatail;
