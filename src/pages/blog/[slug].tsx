import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths
} from 'next';
import { getBlogPost, getBlogPostBySlug } from '@libs/data/data';
import { Layout, SEO, BlogLD } from '@components/common';
import { Banner, Title, Body } from '@components/page/blog';
import { BackIcon } from '@components/icons';
import { useRouter } from 'next/router';
import { imageUrl } from '@libs/directus';

export default function BlogDetails({
  post
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return (
    <div className="page-wrapper">
      {post?.map((item: any) => (
        <div key={item.id}>
          <SEO
            title={item.meta_title}
            description={item.meta_description}
            openGraph={{
              type: 'website',
              title: item.meta_title,
              description: item.meta_description,
              images: [
                {
                  url: 'assets/' + item.feature_image.id,
                  width: item.feature_image.width,
                  height: item.feature_image.height,
                  alt: item.meta_title
                }
              ]
            }}
          />
          <BlogLD
            type="Blog"
            headline={item.title + '.' + item.subtitle}
            image={[`${imageUrl}/${item.feature_image.id}`]}
            datePublished={item.date_created}
            dateModified={item.date_updated}
            authorName={`${item.user_created.first_name} ${item.user_created.last_name}`}
          />
          <Banner title={item.title} image={item.feature_image.id} />
          <section className="post isContainer">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Back button"
              className="absolute"
            >
              <BackIcon />
            </button>
            <Title
              title={item.title}
              subtitle={item.subtitle}
              published={item.date_created}
              author={
                item.user_created.first_name + ' ' + item.user_created.last_name
              }
              updated={item.date_updated}
              readtime={item.content}
            />
            <Body content={item.content} />
          </section>
        </div>
      ))}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async ({}) => {
  const getPost = await getBlogPostBySlug();

  return {
    paths: getPost?.map((post: any) => `/blog/${post.slug}`) || [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await getBlogPost(slug);

  return {
    props: {
      post
    }
  };
};

BlogDetails.Layout = Layout;
