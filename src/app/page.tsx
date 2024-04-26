import React from "react";
import SearchPage from "./search/SearchPage";
import { getAllPackages } from "./search/actions";

const Home = async (): Promise<JSX.Element> => {
  const packages = await getAllPackages();
  return (
    <>
      <h2 className="mt-10 text-center">
        Search a Github Repo Based on its inplementation
      </h2>
      <p className="mb-10 text-center">For Node Js Based Repos</p>
      <SearchPage packages={packages} />
    </>
  );
};

export default Home;
