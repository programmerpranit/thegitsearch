import Link from "next/link";
import React from "react";

function page(): JSX.Element {
  return (
    <>
      <div className="mx-auto max-w-6xl p-5 text-center ">
        <h2 className="mt-10 text-center">An AI Based Advance Search</h2>
        <p className=" mb-10 text-center">For Node Js Based Repos</p>
        <h3>
          What is <span className="text-primary">GitSearch</span>?{" "}
        </h3>
        <p className="">
          <span className="text-primary">GitSearch</span> is an ultimate tool to
          efficiently explore Git repositories, finding projects based on their
          utilized technologies!
        </p>
        <br />
        <h3>How does git search works?</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At numquam
          tempora ab voluptas, neque earum cum! Consequatur fugit velit, id
          cumque quas iure necessitatibus error molestias autem exercitationem
          consectetur excepturi.
        </p>

        <Link href={"/search"}>
          <button className="mt-10 bg-primary">Search right away! </button>
        </Link>
      </div>
    </>
  );
}

export default page;
