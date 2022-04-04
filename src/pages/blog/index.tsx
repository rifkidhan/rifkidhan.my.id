import type { ReactElement } from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { PostCard, CategoryButton } from "@/components/page/blog";
import { Layout, Breadcrumb, BaseSeo } from "@/components/common";
import {
  getBlogPostIndex,
  getBlogPostFilterIndex,
  getBlogCategory,
  getBlogPostsIndex,
  getCategoryBlog,
} from "@/libs/data/queries";
import useSWR, { SWRConfig } from "swr";
import { fetcher } from "@/libs/api";
import { useState } from "react";

const Blogs = ({}) => {
  const [category, setCategory] = useState<string>("All");

  const variables = { category: `${category}` };
  const { data: blog } = useSWR(
    category !== "All" ? [getBlogPostFilterIndex, variables] : getBlogPostIndex,
    fetcher
  );
  const { data: blog_category } = useSWR(getBlogCategory, fetcher);

  return (
    <div className="page-wrapper">
      <BaseSeo
        title="Blogs"
        description="All blogs on this website"
        slug="/blogs"
      />
      <Breadcrumb title={"Blogs"} />
      <section className="blog_index isContainer">
        <div className="category_button_wrapper no-scrollBar">
          <CategoryButton onClick={() => setCategory("All")} title="All" />
          {blog_category?.blog_category.map((category: any) => (
            <div key={category.id}>
              <CategoryButton
                onClick={() => setCategory(`${category.title}`)}
                title={category.title}
              />
            </div>
          ))}
        </div>
        <h3 className="text-center">{category} Blogs</h3>
        <div className="postCard_index">
          {blog?.blog.map((blog: any) => (
            <div key={blog.id}>
              <PostCard
                title={blog.title}
                slug={blog.slug}
                image={blog.feature_image.id}
                content={blog.content}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export async function getStaticProps({}: GetStaticPropsContext) {
  const posts = await getBlogPostsIndex();
  const categories = await getCategoryBlog();

  return {
    props: {
      fallback: {
        getBlogPostIndex: posts,
        getBlogCategory: categories,
      },
    },
    revalidate: 60,
  };
}

const IndexBlog = ({
  fallback,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Blogs />
    </SWRConfig>
  );
};

export default IndexBlog;

IndexBlog.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
