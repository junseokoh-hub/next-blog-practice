import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostApiResponse } from "@/utils/types";

export const readPostsInfo = (): PostApiResponse => {
  const dirPathToRead = path.join(process.cwd(), "posts");
  const dirs = fs.readdirSync(dirPathToRead);
  const data = dirs.map((fileName) => {
    const filePathToRead = path.join(process.cwd(), "posts/" + fileName);
    const fileContent = fs.readFileSync(filePathToRead, "utf-8");
    return matter(fileContent).data;
  });

  return data as PostApiResponse;
};
