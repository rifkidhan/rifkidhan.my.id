import type { ReactElement } from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { LayoutBlack as Layout } from "@/components/layout";
import { getHomeFeature, getPostForHome } from "@/libs/data/queries";
import { HeroSection, FeatureSection, BlogSection } from "@/components/home";

const Home = ({
  posts,
  homeFeatures,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="page-wrapper page-wrapper__atCenter">
      <HeroSection />
      <FeatureSection features={homeFeatures} />
      <BlogSection posts={posts} />
    </div>
  );
};

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const posts = await getPostForHome();
  const homeFeatures = await getHomeFeature();

  return {
    props: {
      posts,
      homeFeatures,
    },
    revalidate: 60 * 10,
  };
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
