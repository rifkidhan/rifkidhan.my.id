import Head from 'next/head';
import { FC, Fragment, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { meta } from '@libs/metaSeo';

const frontendUrl =
  process.env.NEXT_PUBLIC_DIRECTUS_URL || process.env.NEXT_PUBLIC_FRONTEND;
<<<<<<< HEAD
const frontendBaseUrl = frontendUrl ? `${frontendUrl}` : null;
=======
const frontendBaseUrl = frontendUrl ? `${frontendUrl}/assets` : null;
>>>>>>> develop

interface OgImage {
  url?: string;
  width?: string;
  height?: string;
  alt?: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  robots?: string;
  openGraph?: {
    title?: string;
    type?: string;
    locale?: string;
    description?: string;
    site_name?: string;
    url?: string;
    images?: OgImage[];
  };
  children?: ReactNode;
}

const ogImage = ({ url, width, height, alt }: OgImage, index: number) => {
  const imgUrl = frontendBaseUrl
    ? new URL(url!, frontendBaseUrl).toString()
    : url;

  return (
    <Fragment key={`og:image:${index}`}>
      <meta
        key={`og:image:url:${index}`}
        property="og:image"
        content={imgUrl}
      />
      <meta
        key={`og:image:width:${index}`}
        property="og:image:width"
        content={width}
      />
      <meta
        key={`og:image:height:${index}`}
        property="og:image:height"
        content={height}
      />
      <meta
        key={`og:image:alt:${index}`}
        property="og:image:alt"
        content={alt}
      />
    </Fragment>
  );
};

const SEO: FC<SEOProps> = ({
  title,
  description,
  openGraph,
  robots,
  children
}) => {
  const router = useRouter();
  return (
    <Head>
      <title key="title">
        {title ? `${meta.titleTemplate.replace(/%s/g, title)}` : meta.title}
      </title>
      <meta
        key="description"
        name="description"
        content={description || meta.description}
      />
      <link
        key="canonical"
        rel="canonical"
        href={meta.canonical + (router.asPath || '')}
      />
      <meta
        key="og:type"
        property="og:type"
        content={openGraph?.type ?? meta.openGraph.type}
      />
      <meta
        key="og:title"
        property="og:title"
        content={
          openGraph?.title ?? meta.openGraph.title ?? title ?? meta.title
        }
      />
      <meta
        key="og:description"
        property="og:description"
        content={
          openGraph?.description ??
          meta.openGraph.description ??
          description ??
          meta.description
        }
      />
      <meta
        key="og:site_name"
        property="og:site_name"
        content={openGraph?.site_name ?? meta.openGraph.site_name}
      />
      <meta
        key="og:url"
        property="og:url"
        content={openGraph?.url ?? meta.openGraph.url}
      />
      {openGraph?.images?.length
        ? openGraph.images.map((img, index) => ogImage(img, index))
        : ogImage(meta.openGraph.images[0], 0)}
      {meta.twitter.cardType && (
        <meta
          key="twitter:card"
          name="twitter:card"
          content={meta.twitter.cardType}
        />
      )}
      {meta.twitter.site && (
        <meta
          key="twitter:site"
          name="twitter:site"
          content={meta.twitter.site}
        />
      )}
      {meta.twitter.handle && (
        <meta
          key="twitter:creator"
          name="twitter:creator"
          content={meta.twitter.handle}
        />
      )}
      <meta key="robots" name="robots" content={robots ?? 'index,follow'} />
      <meta
        key="googlebot"
        name="googlebot"
        content={robots ?? 'index,follow'}
      />
      {children}
    </Head>
  );
};

export default SEO;
