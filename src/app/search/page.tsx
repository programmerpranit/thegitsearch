import React from "react";
import SearchPage from "./SearchPage";
import { getAllPackages } from "./actions";

const Search = async (): Promise<JSX.Element> => {
  const packages = await getAllPackages();

  return <SearchPage packages={packages} />;
};

export default Search;
