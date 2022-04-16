import { FC } from "react";
import s from "./Body.module.css";
import Markdown from "markdown-to-jsx";

interface Props {
  content: string;
}

const BlogBody: FC<Props> = ({ content }) => {
  return <Markdown className={s.body}>{content}</Markdown>;
};

export default BlogBody;
