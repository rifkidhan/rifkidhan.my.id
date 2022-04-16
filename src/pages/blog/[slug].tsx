import type {
  GetStaticPathsContext,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import { getBlogPost, getBlogPostBySlug } from "@libs/data/data";
import { Layout } from "@components/common";
import { Banner, Title, Body } from "@components/page/blog";
import { BackIcon } from "@components/icons";
import { useRouter } from "next/router";
import { PostSeo } from "@components/common";

export default function BlogDetails({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  return (
    <div className="page-wrapper">
      {post?.map((item: any) => (
        <div key={item.id}>
          <PostSeo
            title={item.meta_title}
            description={item.meta_description}
            slug={`/blog/${item.slug}`}
            tags={item.tags}
            images={item.feature_image.id}
            imageWidth={item.feature_image.width}
            imageHeight={item.feature_image.height}
            datePublished={item.date_created}
            dateModified={item.date_updated}
            author={
              item.user_created.first_name + " " + item.user_created.last_name
            }
          />
          <Banner title={item.title} image={item.feature_image.id} />
          <section className="post isContainer">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Back button"
              className="absolute"
            >
              <BackIcon />
            </button>
            <Title
              title={item.title}
              subtitle={item.subtitle}
              published={item.date_created}
              author={
                item.user_created.first_name + " " + item.user_created.last_name
              }
              updated={item.date_updated}
            />
            <Body content={item.content} />
          </section>
        </div>
      ))}
    </div>
  );
}

export const getStaticPaths = async ({}: GetStaticPathsContext) => {
  const getPost = await getBlogPostBySlug();

  return {
    paths: getPost?.map((post: any) => `/blog/${post.slug}`),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const post = await getBlogPost(params!.slug);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

BlogDetails.Layout = Layout;
