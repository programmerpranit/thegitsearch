import React from "react";

import { loginWithGithub } from "../actions";
import LoginUtil from "./LoginUtil";

const GithubPage = async ({
  searchParams,
}: {
  searchParams: { code: string };
}): Promise<JSX.Element> => {
  const token = await loginWithGithub(searchParams.code);

  return (
    <>
      <LoginUtil token={token} />
      <div>Redirecting ...</div>
    </>
  );
};

export default GithubPage;
