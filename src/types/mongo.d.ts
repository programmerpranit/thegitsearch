import type { IRepo } from "@/models/Repo";
import type { IUser } from "@/models/User";
import type { JwtPayload } from "jsonwebtoken";

interface MongoBase {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IPayload extends JwtPayload {
  admin: {
    verified: boolean;
    _id: string;
  };
}

interface RepoType extends IRepo, MongoBase {}

interface UserType extends IUser, MongoBase {}
