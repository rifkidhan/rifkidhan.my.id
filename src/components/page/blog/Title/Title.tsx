import { FC } from "react";
import { Date } from "@components/common";
import s from "./Title.module.css";

interface Props {
  title: string;
  subtitle: string;
  published: string;
  author: string;
  updated: string;
}

const BlogTitle: FC<Props> = ({
  title,
  subtitle,
  published,
  author,
  updated,
}) => {
  return (
    <>
      <div className={s.title}>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <div className="text-stone-500">
        Posted <Date dateString={published} /> by {author} / Last Updated{" "}
        <Date dateString={updated} />
      </div>
    </>
  );
};

export default BlogTitle;
