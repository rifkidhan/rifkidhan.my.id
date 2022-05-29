import { Layout } from '@components/common';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import { Breadcrumb, SEO } from '@components/common';
import { Profile } from '@components/page/about';
import { getAboutMe } from '@libs/data/data';

const AboutPage = ({
  about
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="page-wrapper page-wrapper__atCenter">
      <SEO
        title={about.meta_title}
        description={about.meta_description}
        openGraph={{
          title: about.meta_title,
          description: about.meta_description,
          images: [
            {
              url: about.image.id,
              height: about.image.height,
              width: about.image.width,
              alt: about.meta_title
            }
          ]
        }}
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
      about
    },
    revalidate: 60 * 5
  };
};

AboutPage.Layout = Layout;
