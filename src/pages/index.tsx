import { InferGetStaticPropsType, GetStaticProps } from "next";
import { Layout } from "@components/common";
import {
  HeroSection,
  FeatureSection,
  BlogSection,
} from "@components/page/home";
import { BaseSeo, Preview } from "@components/common";
import { getPostForHome, getHomeFeature } from "@libs/data/data";

const Home = ({
  blogs,
  homeFeatures,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="page-wrapper page-wrapper__atCenter">
      {preview && <Preview />}

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

export const getStaticProps: GetStaticProps = async ({ preview = null }) => {
  const blogs = await getPostForHome(preview);
  const homeFeatures = await getHomeFeature();

  return {
    props: {
      blogs,
      homeFeatures,
      preview,
    },
    revalidate: 60,
  };
};

export default Home;

Home.Layout = Layout;
