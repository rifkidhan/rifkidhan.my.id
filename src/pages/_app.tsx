import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import siteConfig from "@/libs/siteConfig";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import { metaLink, metaTags } from "@/libs/siteMeta";

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const router = useRouter();
	const getLayout = Component.getLayout ?? ((page) => page);

	return getLayout(
		<>
			<Head>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
				/>
			</Head>
			<DefaultSeo
				canonical={siteConfig.url + (router.asPath || "")}
				description={siteConfig.description}
				openGraph={{
					title: siteConfig.title,
					description: siteConfig.description,
					type: "website",
					site_name: siteConfig.title,
					images: [
						{
							url: `${siteConfig.url}/vercel.svg`,
							width: 1024,
							height: 512,
							alt: siteConfig.title,
						},
					],
				}}
				title="Home"
				titleTemplate={`%s | ${siteConfig.title}`}
				twitter={{
					cardType: "summary_large_image",
					handle: siteConfig.twitterUsername,
					site: siteConfig.twitterUsername,
				}}
				additionalLinkTags={metaLink}
				additionalMetaTags={metaTags}
			/>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
