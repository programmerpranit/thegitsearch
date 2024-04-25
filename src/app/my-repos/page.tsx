"use client";
import connectToDB from "@/middleware/connectToDB";
import { Github, Link as LINK } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
  const getMyRepos = async () => {
    await connectToDB();
  };
  const router = useRouter();

  const dummyRepoData = [
    {
      id: 5735257176,
      node_id: "R_kgDOIi9O1Q",
      name: "nirwana-resort",
      full_name: "prathameshkarambelkar/nirwana-resort",
      private: false,
      html_url: "https://github.com/prathameshkarambelkar/nirwana-resort",
      description: "This will be a brief description of the repository",
      clone_url: "https://github.com/prathameshkarambelkar/nirwana-resort.git",
      homepage: "https://nirwana-resort.vercel.app",
      language: "JavaScript",
      topics: ["nextjs", "CSS", "bootstrap"],
    },
    {
      id: 5735257177,
      node_id: "R_kgDOIi9O1Q",
      name: "nirwana-resort",
      full_name: "prathameshkarambelkar/nirwana-resort",
      private: false,
      html_url: "https://github.com/prathameshkarambelkar/nirwana-resort",
      description: "This will be a brief description of the repository",
      clone_url: "https://github.com/prathameshkarambelkar/nirwana-resort.git",
      homepage: "https://nirwana-resort.vercel.app",
      language: "JavaScript",
      topics: ["zustand", "tailwind"],
    },
  ];
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-2 text-center">My Repositories</h2>
      <div className="flex w-[70%] flex-col items-start  justify-center gap-2">
        {dummyRepoData.map((repo) => (
          <div
            key={repo.id}
            className=" flex w-full items-center  justify-between  rounded-md bg-gray-100 p-4"
          >
            <div>
              <h4>{repo.name}</h4>
              <h5>{repo.language}</h5>
              <p>{repo.description}</p>
              <div className="flex">
                <h5 className="mr-2" >Topics :</h5>
                {repo.topics.map((topic) => (
                  <h5 className="mr-2">{topic}</h5>
                ))}
              </div>
            </div>

            <div className="flex gap-4 self-start">
              <a href={repo.html_url}>
                <Github />
              </a>
              <a href={repo.homepage}>
                <LINK />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
