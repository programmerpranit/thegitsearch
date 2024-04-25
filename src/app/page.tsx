// use client (assuming you're using Next.js with React Server Components)
"use client";
import React, { useState } from "react";
import SearchForm from "./search/SearchForm"; // Import your SearchForm component
import { searchRepo } from "./search/actions";
import Link from "next/link";

interface SearchData {
  language: string;
  framework: string;
  package: [];
}

export default function Home(): JSX.Element {
  const [formData, setFormData] = useState<SearchData>({
    language: "",
    framework: "",
    package: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await searchRepo(
        formData.language,
        formData.framework,
        formData.package
      );
      console.log(res);
      console.log("Selected Data:", formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-6xl p-5 ">
        <h2 className="mt-10 text-center">An AI Based Advance Search</h2>
        <p className=" mb-10 text-center">For Node Js Based Repos</p>
        <h3>
          What is <span className="text-primary">GitSearch</span>?{" "}
        </h3>
        <p className="">
          <span className="text-primary">GitSearch</span> is an ultimate tool to
          efficiently explore Git repositories, finding projects based on their
          utilized technologies!
        </p>
        <h3>How does git search works?</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At numquam
          tempora ab voluptas, neque earum cum! Consequatur fugit velit, id
          cumque quas iure necessitatibus error molestias autem exercitationem
          consectetur excepturi.
        </p>

        <Link href={"/search"}>
          <button  className="mt-10 bg-primary">Search right away! </button>
        </Link>
        {/* <SearchForm /> Assuming SearchForm renders relevant UI elements */}
        {/* <h3 className="my-8 text-center">OR</h3> */}
        {/* <div className="mb-10 ">
          <h3 className="mb-5">Advance Filters</h3>
          <form onSubmit={handleSubmit}>
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
                  <option value="Next JS pages">Next JS pages</option>
                  <option value="Next JS app">Next JS app</option>
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
        </div> */}
      </div>
    </>
  );
}
