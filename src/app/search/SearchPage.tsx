"use client";

import React, { useEffect, useState } from "react";
import { getAllPackages, searchRepo } from "./actions";
import Repository from "../my-repos/components/Repository";
import { useRouter } from "next/navigation";
import type { RepoType } from "@/types/mongo";
import MultiSelect from "./MultiSelect";
import SearchPackage from "./SearchPackage";

const SearchPage = ({ packages }: { packages: string[] }): JSX.Element => {
  const router = useRouter();

  const [language, setLanguage] = useState("Javascript");
  const [framework, setFramework] = useState("");
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  const [searchResults, setSearchResults] = useState<RepoType[]>([]);

  const handleSubmit = async (): Promise<void> => {
    try {
      const res = await searchRepo(language, framework, selectedPackages);
      console.log(res);
      setSearchResults(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-7xl">
      <div className="flex ">
        <div className="w-1/2 pr-2">
          <p className="font-semibold">Language</p>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
            className="inp w-full"
          >
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
          </select>
        </div>
        <div className=" w-1/2 pr-2">
          <p className="font-semibold">Framework</p>
          <select
            value={framework}
            onChange={(e) => {
              setFramework(e.target.value);
            }}
            className="inp w-full"
          >
            <option value="">Any</option>
            <option value="React">React</option>
            <option value="NextJS">Next JS</option>
            <option value="NodeJS">Node Js</option>
            <option value="Express">Express</option>
            <option value="Vue">Vue</option>
            <option value="Remix">Remix</option>
          </select>
        </div>
      </div>
      <br />
      <div className="mx-auto w-1/2 pr-2 ">
        <p className="font-semibold">Packages </p>
        {/* <MultiSelect packages={packages} /> */}
        <SearchPackage
          selectedOptions={selectedPackages}
          setSelectedOptions={setSelectedPackages}
          packages={packages}
        />
      </div>
      <div className="mt-5 text-center">
        <button
          onClick={() => {
            void handleSubmit();
          }}
          className="mx-auto mt-5 w-1/2 bg-primary "
        >
          Search
        </button>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex w-[80%]   flex-col gap-3">
          {/* {searchResults.length === 0 && (
            <p>No Repo Found with given Filters</p>
          )} */}
          {searchResults.map((result: RepoType) => (
            <Repository key={result._id} repo={result} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
