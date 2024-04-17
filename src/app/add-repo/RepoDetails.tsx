import Input from "@/components/Input";
import type { Repo } from "@/types/github";
import type { PackageJSON } from "@/types/node";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const RepoDetails = ({ details }: { details: Repo | null }): JSX.Element => {
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [description, setDescription] = useState<string>(
    details?.description ?? ""
  );
  const [topics, setTopics] = useState<string[]>(details?.topics ?? []);
  const [topic, setTopic] = useState<string>("");

  const getUserNameRepo = (url: string): { user: string; repo: string } => {
    const splitted = url.split("/");
    return { user: splitted[3], repo: splitted[4] };
  };

  const fetchPackages = async (): Promise<void> => {
    try {
      if (details === null) return;
      const { user, repo } = getUserNameRepo(details.html_url);
      const url = `https://raw.githubusercontent.com/${user}/${repo}/main/package.json`;
      const res = await axios.get(url);
      const packageJSON = res.data as PackageJSON;
      const dep = Object.keys(packageJSON.dependencies);
      setDependencies(dep);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const addRepo = async (): Promise<void> => {};

  useEffect(() => {
    if (details === null) return;
    void fetchPackages();
  }, [details]);

  return (
    <div className="my-10 w-full rounded-xl border-2 p-5">
      <h3>Repo Details</h3>

      <Input
        label="Repo Name"
        value={details?.name}
        disabled
        setValue={(e) => {
          console.log(e);
        }}
        type="text"
      />

      <Input
        label="Language Used"
        value={details?.language}
        disabled
        type="text"
      />

      <div className={` my-3 flex flex-col`}>
        <label className="font-medium">Detected Framework</label>
        <select className="max-w-xl rounded border px-3 py-2 outline-none">
          <option value="Unknown">Unknown</option>
          <option value="React">React</option>
          <option value="NextJS">NextJS</option>
        </select>
      </div>

      <Input
        label="Description"
        value={description}
        setValue={setDescription}
        type="text"
        onKeyDown={(e: any) => {
          console.log("psp");
          console.log("Key", e.key);
          if (e.key === "Enter") {
            toast("Enter");
          }
        }}
        placeholder="Write your own description"
      />

      <Input
        label="Add Tags (Enter to Add)"
        value={topic}
        setValue={setTopic}
        type="text"
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            setTopics([...topics, topic]);
            setTopic("");
          }
        }}
        placeholder="Similar to github topics"
      />

      <div className="mb-5 flex gap-3">
        {topics.map((t: string) => (
          <p className="rounded bg-gray-100 px-2 py-1" key={t}>
            {t} <span className="cursor-pointer pl-1">X</span>
          </p>
        ))}
      </div>

      <p className="mb-1 font-medium">Packages/Modules Used</p>
      <div className="flex flex-wrap gap-3">
        {dependencies.map((t: string) => (
          <p className="rounded bg-gray-100 px-2 py-1" key={t}>
            {t}
          </p>
        ))}
      </div>

      <button onClick={addRepo} className="mt-5 bg-primary">
        Add Repo
      </button>
    </div>
  );
};

export default RepoDetails;
