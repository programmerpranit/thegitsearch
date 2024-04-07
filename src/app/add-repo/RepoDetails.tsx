import type { Repo } from "@/types/github";
import type { PackageJSON } from "@/types/node";
import axios from "axios";
import React, { useEffect } from "react";

const RepoDetails = ({ details }: { details: Repo | null }): JSX.Element => {
  const getUserNameRepo = (url: string): { user: string; repo: string } => {
    const splitted = url.split("/");
    return { user: splitted[3], repo: splitted[4] };
  };
  const fetchPackages = async (): Promise<void> => {
    try {
      if (details === null) return;
      getUserNameRepo(details.html_url);
      console.log("Fetching");
      const url = `https://raw.githubusercontent.com/${user}/${repo}/main/package.json`;
      const res = await axios.get(url);
      console.log(res);
      const packageJSON = res.data as PackageJSON;
      const dep = Object.keys(packageJSON.dependencies);

      console.log(dep);

      setDependencies(dep);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (details === null) return;
    void fetchPackages();
  }, [details]);

  return <div>RepoDetails</div>;
};

export default RepoDetails;
