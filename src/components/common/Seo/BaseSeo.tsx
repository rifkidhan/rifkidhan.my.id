import { NextSeo } from "next-seo";
import { FC } from "react";
import { url } from "@libs/siteConfig";

interface Props {
  title: string;
  description: string;
  slug: string;
}

const BaseSeo: FC<Props> = (props) => {
  return (
    <>
      <NextSeo
        title={props.title}
        description={props.description}
        openGraph={{
          type: "website",
          url: url + props.slug,
          title: props.title,
          description: props.description,
          images: [
            {
              url: `${url}/rifkidhan.png`,
              width: 800,
              height: 600,
              alt: props.title,
            },
          ],
        }}
      />
    </>
  );
};

export default BaseSeo;
