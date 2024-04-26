"use client";
import { getMyProfile } from "@/lib/utils";
import React, { useEffect, useState } from "react";

function Page(): JSX.Element {
  const [userDetails, setUserDetails] = useState();
  const getUserProfile = (): void => {
    const res = getMyProfile();
    console.log(res);
    setUserDetails(res);
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className="flex flex-col items-center self-center">
      <h3>Name: {userDetails?.githubUserName}</h3>
      <h3>GithubID: {userDetails?.githubID}</h3>
    </div>
  );
}

export default Page;
