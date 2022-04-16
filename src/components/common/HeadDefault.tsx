import { FC } from "react";
import siteConfig from "@libs/siteConfig";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import { metaLink, metaTags } from "@libs/siteMeta";

const HeadDefault: FC = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <DefaultSeo
        titleTemplate={`%s | ${siteConfig.title}`}
        twitter={{
          cardType: "summary_large_image",
          handle: siteConfig.twitterUsername,
          site: siteConfig.twitterUsername,
        }}
        canonical={siteConfig.url + (router.asPath || "")}
        description={siteConfig.description}
        openGraph={{
          title: siteConfig.title,
          description: siteConfig.description,
          type: "website",
          site_name: siteConfig.title,
          images: [
            {
              url: `${siteConfig.url}/rifkidhan.png`,
              width: 512,
              height: 512,
              alt: siteConfig.title,
            },
          ],
        }}
        additionalLinkTags={metaLink}
        additionalMetaTags={metaTags}
      />
    </>
  );
};

export default HeadDefault;
