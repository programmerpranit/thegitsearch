"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { searchRepo } from "./actions";

const SearchForm = (): JSX.Element => {
  const [search, setSearch] = useState("");

  const router = useRouter();
  const searchRepoWrapper = (e: any): void => {
    e.preventDefault();
    // router.push(`/search?q=${search}`);
    void searchRepo("TypeScript", "NextJS", ["axios", "nodemailer"]);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          searchRepoWrapper(e);
        }}
        className="w-full text-center"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="inp mx-auto w-full placeholder:text-center md:w-1/2"
          placeholder="Search a Repo with Prompt"
        />
        <button type="submit" className="mx-2 bg-primary">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchForm;
