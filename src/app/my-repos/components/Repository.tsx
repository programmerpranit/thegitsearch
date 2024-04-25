import { Github, Link } from "lucide-react";
import React from "react";
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
function Repository({ repo }: { repo: Repo }): JSX.Element {
  return (
    <div
      key={repo?._id}
      className=" flex w-full items-center  justify-between  rounded-md bg-gray-100 p-4"
    >
      <div>
        <h4>{repo?.name}</h4>
        <h5>{repo?.language}</h5>
        <p>{repo?.description}</p>
        <div className="flex">
          <h5 className="mr-2">Topics :</h5>
          {repo?.tags?.map((topic) => (
            <h5 className="mr-2" key={topic}>
              {topic}
            </h5>
          ))}
        </div>
      </div>

      <div className="flex gap-4 self-start">
        <a href={''}>
          <Github />
        </a>
        <a href={''}>
          <Link />
        </a>
      </div>
    </div>
  );
}

export default Repository;
