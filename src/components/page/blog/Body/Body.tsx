import { FC } from "react";
import s from "./Body.module.css";
import { Markdown } from "@components/common";

interface Props {
  content: string;
}

const BlogBody: FC<Props> = ({ content }) => {
  return <Markdown content={content} />;
};

export default BlogBody;
