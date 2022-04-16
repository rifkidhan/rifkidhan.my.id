import { ArticleJsonLd, NextSeo } from "next-seo";
import { FC } from "react";
import { url } from "@libs/siteConfig";
import { imageUrl } from "@libs/constant";

interface Props {
  title: string;
  description: string;
  slug?: string;
  tags?: string[];
  images: string;
  imageWidth?: number;
  imageHeight?: number;
  datePublished: string;
  dateModified: string;
  author: string;
}

const PostSeo: FC<Props> = (props) => {
  return (
    <>
      <NextSeo
        title={props.title}
        description={props.description}
        openGraph={{
          title: props.title,
          description: props.description,
          url: url + props.slug,
          type: "article",
          article: {
            publishedTime: props.datePublished,
            modifiedTime: props.dateModified,
            tags: props.tags,
          },
          images: [
            {
              url: `${imageUrl}/${props.images}`,
              width: props.imageWidth,
              height: props.imageHeight,
              alt: props.title,
            },
          ],
        }}
      />
      <ArticleJsonLd
        url={url + props.slug}
        title={props.title}
        images={[`${imageUrl}/${props.images}`]}
        datePublished={props.datePublished}
        dateModified={props.dateModified}
        authorName={[props.author]}
        publisherName={props.author}
        publisherLogo={`${url}/rifkidhan.png`}
        description={props.description}
      />
    </>
  );
};

export default PostSeo;
