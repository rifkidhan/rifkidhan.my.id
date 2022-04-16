import { InferGetStaticPropsType, GetStaticProps } from "next";
import { Layout } from "@components/common";
import {
  HeroSection,
  FeatureSection,
  BlogSection,
} from "@components/page/home";
import { BaseSeo } from "@components/common";
import { getPostForHome, getHomeFeature } from "@libs/data/data";

const Home = ({
  blogs,
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
      <BlogSection blogs={blogs} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blogs = await getPostForHome();
  const homeFeatures = await getHomeFeature();

  return {
    props: {
      blogs,
      homeFeatures,
    },
    revalidate: 60,
  };
};

export default Home;

Home.Layout = Layout;
