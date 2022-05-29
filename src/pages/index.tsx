import { InferGetStaticPropsType, GetStaticProps } from 'next';
import { Layout } from '@components/common';
import {
  HeroSection,
  FeatureSection,
  BlogSection
} from '@components/page/home';
import { getPostForHome, getHomeFeature } from '@libs/data/data';

const Home = ({
  blogs,
  homeFeatures
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="page-wrapper page-wrapper__atCenter">
      <HeroSection />
      <FeatureSection features={homeFeatures} />
      <BlogSection blogs={blogs} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({}) => {
  const blogs = await getPostForHome();
  const homeFeatures = await getHomeFeature();

  return {
    props: {
      blogs,
      homeFeatures
    },
    revalidate: 60
  };
};

export default Home;

Home.Layout = Layout;
