import { FC } from "react";
import Link from "next/link";
import s from "./HomeBlog.module.css";
import { PostCard } from "@components/page/blog";
import type { Blog } from "@libs/data/types";

interface Blogs {
  blogs?: Blog[];
}

const BlogSection: FC<Blogs> = ({ blogs }) => {
  return (
    <section className={s.root}>
      <div className={`${s.title}`}>
        <h2>This is my blogs.</h2>
      </div>
      <div className={`${s.posts}`}>
        {blogs?.map((blog) => (
          <div key={blog.id}>
            <PostCard
              title={blog.title}
              slug={blog.slug}
              image={blog.feature_image.id}
              content={blog.excerpt}
            />
          </div>
        ))}
      </div>
      <Link href={`/blog`} passHref className={s.readMore}>
        Click here to more post
      </Link>
    </section>
  );
};

export default BlogSection;
