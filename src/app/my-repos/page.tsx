import connectToDB from "@/middleware/connectToDB";
import React from "react";

const page = () => {
  const getMyRepos = async () => {
    await connectToDB();
  };

  return <div>page</div>;
};

export default page;
