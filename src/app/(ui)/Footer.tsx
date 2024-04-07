import Link from "next/link";
import React from "react";

function Footer(): JSX.Element {
  return (
    <div className="py-20 ">
      <div className="mx-auto flex max-w-6xl flex-col md:flex-row">
        <div className="md:w-1/2">
          <h2>GitSearch</h2>
          <p>Only Better Alternative for OG git search</p>
        </div>
        <div className="md:w-1/2">
          <h3>Quick Links</h3>
          <Link href={"/add-repo"}>
            <p className="font-semibold">Add Repo</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
