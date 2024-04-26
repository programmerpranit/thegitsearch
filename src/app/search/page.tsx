"use client";
import React, { useState } from "react";
import { getRepoDetails, searchRepo } from "./actions";
import Repository from "../my-repos/components/Repository";
import SearchForm from "./SearchForm";
import { useRouter } from "next/navigation";
import type { RepoType } from "@/types/mongo";
interface SearchData {
  language: string;
  framework: string;
  package: [];
}

const Search = (): JSX.Element => {
  const [formData, setFormData] = useState<SearchData>({
    language: "JavaScript",
    framework: "Typescript",
    package: [],
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<RepoType[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await searchRepo(
        formData.language,
        formData.framework,
        formData.package
      );
      console.log(res);
      setSearchResults(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto max-w-7xl">
      {/* <h2 className="mt-10 text-center">
        An AI Based Advance <span className="text-primary">GitSearch</span>
      </h2> */}
      {/* <p className="mb-10 text-center">For Node Js Based Repos</p> */}
      <h3 className=" text-center">Search</h3>
      <SearchForm /> {/* Assuming SearchForm renders relevant UI elements */}
      <p className="mt-5 text-center">OR</p>
      <h3 className="mb-5 text-center">Use Advance Filters</h3>
      <form
        className="px-10"
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
      >
        <div className="flex">
          <div className="w-1/3 pr-2">
            <p className="font-semibold">Language</p>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="inp w-full"
            >
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
            </select>
          </div>
          <div className="w-1/3 pr-2">
            <p className="font-semibold">Framework</p>
            <select
              name="framework"
              value={formData.framework}
              onChange={handleChange}
              className="inp w-full"
            >
              <option value="React">React</option>
              <option value="NextJS">Next JS</option>
              <option value="Node Js">Node Js</option>
              <option value="Express">Express</option>
              <option value="Vue">Vue</option>
              <option value="Remix">Remix</option>
            </select>
          </div>
          <div className="w-1/3 pr-2">
            <p className="font-semibold">Famous Package/Module</p>

            <select
              name="package"
              value={formData.package}
              onChange={handleChange}
              className="inp w-full"
            >
              <option value="zustand">zustand</option>
              <option value="react-query">react-query</option>
              <option value="react-toastify">react-toastify</option>
              <option value="axios">axios</option>
              <option value="mongoose">mongoose</option>
            </select>
          </div>
        </div>
        <div className="my-5 text-center">
          <button type="submit" className="mx-auto mt-5 w-1/2 bg-primary ">
            Search
          </button>
        </div>
      </form>
      {loading ? (
        <>
          <h4>Loading...</h4>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <div className="flex w-[80%]   flex-col gap-3">
            {searchResults.map((result: Repo) => (
              <div
                onClick={() => {
                  router.push(`/repo?id=${result._id}`);
                }}
                className=" "
                key={result._id}
              >
                <Repository repo={result} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
