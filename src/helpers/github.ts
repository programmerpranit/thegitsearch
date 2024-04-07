import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";

export const getUsername = (): string => {
  const token = cookies().get("authorization")?.value;
  if (token === undefined) throw Error("Invalid Token");
  const payload = decode(token);
  console.log(payload);
  return payload?.user.githubUserName as string;
};
