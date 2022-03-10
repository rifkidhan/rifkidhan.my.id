import Layout from "@/components/Layout";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import type { ReactElement } from "react";
import { NextSeo } from "next-seo";
import { getAboutData } from "@/libs/data/queries";
import { imageUrl } from "@/libs/constant";
import Image from "next/image";
import { Breadcrumb } from "@/components/display";

const AboutPage = ({
  about,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="page-wrapper page-wrapper__atCenter">
      <NextSeo title={about.title} />
      <Breadcrumb title={about.title} />
      <div className="isContainer flex flex-col items-center justify-center gap-10 md:min-h-screen md:flex-row">
        <div className="h-32 w-32 overflow-hidden rounded-full">
          <div className="relative h-full w-full">
            <Image
              src={`${imageUrl}/${about.image.id}`}
              layout="fill"
              objectFit="cover"
              alt="Pemilik"
              loading="lazy"
            />
          </div>
        </div>
        <div>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: `${about.description}` }}
          />
        </div>
      </div>
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
    revalidate: 60 * 10,
  };
}

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
