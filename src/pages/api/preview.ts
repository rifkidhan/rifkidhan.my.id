import type { NextApiRequest, NextApiResponse } from "next";
import { getPreviewPost } from "@libs/data/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.secret !== process.env.PREVIEW_SECRET || !req.query.slug) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const post = await getPreviewPost(req.query.slug);

  if (!post) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  res.setPreviewData({});

  res.writeHead(307, { Location: `/blog/${post.slug}` });
  res.end();
};
