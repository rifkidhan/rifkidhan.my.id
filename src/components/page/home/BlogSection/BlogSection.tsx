import { FC } from "react";
import Link from "next/link";
import s from "./HomeBlog.module.css";
import { PostCard } from "@/components/page/blog";

interface Post {
  id: any;
  title: string;
  feature_image: {
    id: string;
  };
  content: any;
  slug: string;
}

interface Posts {
  posts: Post[];
}

const BlogSection: FC<Posts> = ({ posts }) => {
  return (
    <section className={s.root}>
      <div className={`${s.title}`}>
        <h2>This is my blogs.</h2>
      </div>
      <div className={`${s.posts}`}>
        {posts.map((post) => (
          <div key={post.id}>
            <PostCard
              title={post.title}
              slug={post.slug}
              image={post.feature_image.id}
              content={post.content}
            />
          </div>
        ))}
      </div>
      <Link href={`/blog`} passHref>
        <a className={s.readMore}>Click here to more post</a>
      </Link>
    </section>
  );
};

export default BlogSection;
