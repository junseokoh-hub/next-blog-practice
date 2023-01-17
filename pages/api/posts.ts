import { readPostsInfo } from "@/lib/helper";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  // how to read file and folders inside node js

  switch (method) {
    case "GET":
      const data = readPostsInfo();
      return res.json({ postInfo: data });
    default:
      return res.status(404).send("NotFound");
  }
};

export default handler;
