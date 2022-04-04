import type { ReactElement } from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { Layout } from "@/components/common";
import { getHomeFeature, getPostForHome } from "@/libs/data/queries";
import {
  HeroSection,
  FeatureSection,
  BlogSection,
} from "@/components/page/home";
import { BaseSeo } from "@/components/common";

const Home = ({
  posts,
  homeFeatures,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="page-wrapper page-wrapper__atCenter">
      <BaseSeo
        title="Home"
        description="Rifkidhan is Rifki Ramadhan's personal website. Rifkidhan can make you a website base on your need."
        slug="/"
      />
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
    revalidate: 60,
  };
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
