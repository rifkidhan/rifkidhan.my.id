import { NextSeo } from "next-seo";
import { FC } from "react";
import { url } from "@/libs/siteConfig";

interface Props {
  title: string;
  description: string;
  slug: string;
}

const BaseSeo: FC<Props> = ({ title, description, slug }) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: "website",
          url: url + slug,
          title: title,
          description: description,
          images: [
            {
              url: `${url}/rifkidhan.png`,
              width: 800,
              height: 600,
              alt: title,
            },
          ],
        }}
      />
    </>
  );
};

export default BaseSeo;
