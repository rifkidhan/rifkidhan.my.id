import type {
  GetStaticPropsContext,
  GetStaticPathsContext,
  InferGetStaticPropsType,
} from "next";
import { getBlogPost, getBlogPostBySlug } from "@/libs/data/queries";
import { Layout } from "@/components/common";
import { Banner, Title, Body } from "@/components/page/blog";
import { BackIcon } from "@/components/icons";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { ArticleJsonLd, NextSeo } from "next-seo";
import siteConfig from "@/libs/siteConfig";
import { imageUrl } from "@/libs/constant";

export default function BlogDetails({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  return (
    <div className="page-wrapper">
      {post?.map((item: any) => (
        <div key={item.id}>
          <NextSeo
            title={item.meta_title}
            description={item.meta_description}
            openGraph={{
              title: item.meta_title,
              description: item.meta_description,
              url: `${siteConfig.url}/blog/${item.slug}`,
              type: "article",
              article: {
                publishedTime: item.date_created,
                modifiedTime: item.date_updated,
                tags: item.tags,
              },
              images: [
                {
                  url: `${imageUrl}/${item.feature_image.id}`,
                  width: item.feature_image.width,
                  height: item.feature_image.height,
                  alt: item.title,
                },
              ],
            }}
          />
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
    fallback: "blocking",
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
    revalidate: 60,
  };
}

BlogDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
