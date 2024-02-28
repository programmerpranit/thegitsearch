import React from "react";

const LoginPage = (): JSX.Element => {
  const G_ID = process.env.NEXT_PUBLIC_G_ID;

  return (
    <>
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className=" m-auto my-10 w-1/2 text-center">
          <h2>Sign In</h2>
          <div className="m-auto my-5 w-fit cursor-pointer rounded bg-black px-5 py-2">
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${G_ID}`}
            >
              <p className=" text-white">Continue With Github</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
