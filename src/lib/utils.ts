import type { UserType } from "@/types/mongo";
import { type ClassValue, clsx } from "clsx";
import type { JWTPayload } from "jose";
import { decode, type JwtPayload } from "jsonwebtoken";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Retrieves the user profile from the decoded JWT token stored in the local storage.
 * @returns The user profile if the token is valid and contains user information, otherwise null.
 */
export const getMyProfile = (): UserType | null => {
  const token = localStorage.getItem("token");
  if (token === null) return null;

  const decodedToken = decode(token) as JWTPayload;
  if (decodedToken === null || decodedToken?.user === undefined) return null;

  return decodedToken.user as UserType;
};
