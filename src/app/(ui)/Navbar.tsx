"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = (): JSX.Element => {
  const [pathname, setPathname] = useState("/");
  const [token, setToken] = useState<string | null>(null);
  const path = usePathname();

  useEffect(() => {
    setPathname(path);
    const t = localStorage.getItem("token");
    setToken(t);
    // getMyProfile();
  }, [path]);

  if (path.startsWith("/admin")) return <></>;

  return (
    <>
      <nav className="m-auto flex max-w-6xl justify-between p-10 max-md:flex-col ">
        <div className="max-md:my-5 max-md:text-center">
          <Link href="/">
            <h2 className="text-[28px] font-medium text-black">Git Search</h2>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-8">
          <Link href="/search">
            <p
              className={`text-lg  font-medium ${
                pathname === "/search" ? "text-primary" : "text-secondary"
              } hover:text-primary`}
            >
              Search
            </p>
          </Link>

          {token === null && (
            <Link href="/auth/login">
              <p
                className={`text-lg  font-medium ${
                  pathname === "/add-repo" ? "text-primary" : "text-secondary"
                } hover:text-primary`}
              >
                Login
              </p>
            </Link>
          )}
          {token !== null && (
            <Link href="/my-repos">
              <p
                className={`text-lg  font-medium ${
                  pathname === "/my-repos" ? "text-primary" : "text-secondary"
                } hover:text-primary`}
              >
                My Repos
              </p>
            </Link>
          )}
          {token !== null && (
            <Link href="/profile">
              <p
                className={`text-lg  font-medium ${
                  pathname === "/profile" ? "text-primary" : "text-secondary"
                } hover:text-primary`}
              >
                Profile
              </p>
            </Link>
          )}
          <Link href="/about">
            <p
              className={`text-lg  font-medium ${
                pathname === "/about" ? "text-primary" : "text-secondary"
              } hover:text-primary`}
            >
              About
            </p>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
