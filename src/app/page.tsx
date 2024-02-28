import React from "react";
import SearchForm from "./search/SearchForm";

export default function Home(): JSX.Element {
  return (
    <>
      <div className="mx-auto max-w-6xl p-5">
        <h2 className="mt-10 text-center">
          An AI Based Advance <span className="text-primary">GitSearch</span>
        </h2>
        <p className="mb-10 text-center">For Node Js Based Repos</p>
        <SearchForm />
        <div className="my-10 ">
          <h3 className="mb-5">Advance Filters</h3>

          <div className="flex">
            <div className="w-1/3  pr-2">
              <p className="font-semibold">Language</p>
              <select className="inp w-full">
                <option value="js">JavaScript</option>
                <option value="ts">TypeScript</option>
              </select>
            </div>
            <div className="w-1/3  pr-2">
              <p className="font-semibold">Framework</p>
              <select className="inp w-full">
                <option value="">React</option>
                <option value="">Next JS pages</option>
                <option value="">Next JS app</option>
                <option value="">Node Js</option>
                <option value="">Express</option>
                <option value="">Vue</option>
                <option value="">Remix</option>
              </select>
            </div>
            <div className="w-1/3  pr-2">
              <p className="font-semibold">Famous Package/Module</p>
              <select className="inp w-full">
                <option value="">zustand</option>
                <option value="">react-query</option>
                <option value="">react-toastify</option>
                <option value="">axios</option>
                <option value="">mongoose</option>
              </select>
            </div>
          </div>
          <div className="my-5 text-center">
            <button className="mx-auto mt-5 w-1/2 bg-primary ">Search</button>
          </div>
        </div>
      </div>
    </>
  );
}
