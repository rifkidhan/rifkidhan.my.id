import { FC } from "react";
import s from "./Title.module.css";

interface Props {
  title: string;
  subtitle: string;
}

const BlogTitle: FC<Props> = ({ title, subtitle }) => {
  return (
    <>
      <div className={s.title}>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
    </>
  );
};

export default BlogTitle;
