import { Layout } from "@/components/common";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import type { ReactElement } from "react";
import { NextSeo } from "next-seo";
import { getAboutData } from "@/libs/data/queries";
import { Breadcrumb } from "@/components/common";
import { Profile } from "@/components/page/about";

const AboutPage = ({
  about,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="page-wrapper page-wrapper__atCenter">
      <NextSeo title={about.title} description="All about Rifki Ramadhan" />
      <Breadcrumb title={about.title} />
      <Profile image={about.image.id} description={about.description} />
    </div>
  );
};

export default AboutPage;

export async function getStaticProps({}: GetStaticPropsContext) {
  const about = await getAboutData();

  return {
    props: {
      about,
    },
    revalidate: 60,
  };
}

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
