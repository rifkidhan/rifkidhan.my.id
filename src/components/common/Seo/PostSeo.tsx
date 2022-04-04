import { ArticleJsonLd, NextSeo } from "next-seo";
import { FC } from "react";
import { url } from "@/libs/siteConfig";
import { imageUrl } from "@/libs/constant";

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

const PostSeo: FC<Props> = ({
  title,
  description,
  slug,
  tags,
  images,
  imageWidth,
  imageHeight,
  datePublished,
  dateModified,
  author,
}) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title: title,
          description: description,
          url: url + slug,
          type: "article",
          article: {
            publishedTime: datePublished,
            modifiedTime: dateModified,
            tags: tags,
          },
          images: [
            {
              url: `${imageUrl}/${images}`,
              width: imageWidth,
              height: imageHeight,
              alt: title,
            },
          ],
        }}
      />
      <ArticleJsonLd
        url={url + slug}
        title={title}
        images={[`${imageUrl}/${images}`]}
        datePublished={datePublished}
        dateModified={dateModified}
        authorName={[author]}
        publisherName={author}
        publisherLogo={`${url}/rifkidhan.png`}
        description={description}
      />
    </>
  );
};

export default PostSeo;
