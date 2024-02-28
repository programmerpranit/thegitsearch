"use server";

import connectToDB from "@/middleware/connectToDB";
import { User } from "@/models/User";
import { parseJsonFromString } from "@/utils/dataMod";
import axios from "axios";
import { sign } from "jsonwebtoken";

export const loginWithGithub = async (code: string): Promise<string> => {
  try {
    const data = {
      client_id: process.env.G_ID,
      client_secret: process.env.G_SEC,
      code,
    };
    const result = await axios.post(
      "https://github.com/login/oauth/access_token",
      data
    );
    const resData = parseJsonFromString(result.data as string);
    const accessToken: string | undefined = resData.access_token;
    if (accessToken === undefined) throw Error("Unknown Error Occurred");

    const userRes = await axios.get("https://api.github.com/user", {
      data: {
        access_token: accessToken,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (userRes.status !== 200) throw Error("Unknown Error Occurred");

    await connectToDB();
    // check if user exists or not
    const user = await User.findOne({ githubID: userRes.data.id });

    const jwtSec = process.env.JWT_SEC ?? "";

    if (user === null) {
      const newUser = await User.create({
        accessToken,
        githubID: userRes.data.id,
        githubUserName: userRes.data.login,
      });
      const token = sign({ user: newUser }, jwtSec, {
        expiresIn: "7d",
      });
      //   cookies().set("token", token);
      return token;
    }

    const token = sign({ user }, jwtSec, {
      expiresIn: "7d",
    });
    // cookies().set("token", token);
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
