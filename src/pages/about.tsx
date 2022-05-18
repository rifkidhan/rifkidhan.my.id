import { Layout, ProfileSeo } from "@components/common";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { Breadcrumb } from "@components/common";
import { Profile } from "@components/page/about";
import { getAboutMe } from "@libs/data/data";

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

export const getStaticProps: GetStaticProps = async () => {
  const about = await getAboutMe();

  return {
    props: {
      about,
    },
    revalidate: 60 * 5,
  };
};

AboutPage.Layout = Layout;
