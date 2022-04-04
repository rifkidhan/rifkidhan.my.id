import { Layout, ProfileSeo } from "@/components/common";
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
      <ProfileSeo
        title={about.title}
        description={about.description}
        slug={"/about"}
        firstName="Rifki"
        lastName="Ramadhan"
        userName="Rifkidhan"
        gender="male"
        images={about.image.id}
        width={about.image.width}
        height={about.image.height}
      />
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
