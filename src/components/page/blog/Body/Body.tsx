import { FC } from "react";
import s from "./Body.module.css";

interface Props {
  content: string;
}

const BlogBody: FC<Props> = ({ content }) => {
  return (
    <div
      className={s.body}
      dangerouslySetInnerHTML={{ __html: `${content}` }}
    />
  );
};

export default BlogBody;
