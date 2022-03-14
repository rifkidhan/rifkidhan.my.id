import type {
  GetStaticPropsContext,
  GetStaticPathsContext,
  InferGetStaticPropsType,
} from "next";
import { getBlogPost, getBlogPostBySlug } from "@/libs/data/queries";
import { LayoutTransparent as Layout } from "@/components/layout";
import { Banner, Title, Body } from "@/components/blog";
import { BackIcon } from "@/components/icons";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { NextSeo } from "next-seo";

export default function BlogDetails({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  return (
    <div className="page-wrapper">
      {post?.map((item: any) => (
        <div key={item.id}>
          <NextSeo title={`${item.title}`} />
          <Banner title={item.title} image={item.feature_image.id} />
          <section className="post isContainer">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Back button"
            >
              <BackIcon />
            </button>
            <Title title={item.title} subtitle={item.subtitle} />
            <Body content={item.content} />
          </section>
        </div>
      ))}
    </div>
  );
}

export async function getStaticPaths({}: GetStaticPathsContext) {
  const getPost = await getBlogPostBySlug();

  return {
    paths: getPost.map((post: any) => `/blog/${post.slug}`),
    fallback: true,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ slug: string }>) {
  const post = await getBlogPost(params!.slug);

  return {
    props: {
      post,
    },
    revalidate: 60 * 10,
  };
}

BlogDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
