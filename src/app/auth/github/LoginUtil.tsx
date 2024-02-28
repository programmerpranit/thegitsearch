"use client";

import { RedirectType, redirect } from "next/navigation";
import React, { useEffect } from "react";
import Cookies from "js-cookie";

const LoginUtil = ({ token }: { token: string }): JSX.Element => {
  useEffect(() => {
    localStorage.setItem("token", token);
    Cookies.set("authorization", token);
    redirect("/add-repo", RedirectType.replace);
  }, [token]);

  return (
    <>
      <div>Logging In ... </div>
    </>
  );
};

export default LoginUtil;
