'use client'
import { getMyProfile } from "@/lib/utils";
import React, { useEffect, useState } from "react";

function Page(): JSX.Element {
  const[userDetails,setUserDetails] = useState()
  const getUserProfile = (): void => {
    const res = getMyProfile();
    console.log(res);
    setUserDetails(res)
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  return <div>

    <h3>{userDetails?.githubID}</h3>
    <h3>{userDetails?.githubUserName}</h3>
  </div>;
}

export default Page;
