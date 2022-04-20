import "@styles/globals.css";
import type { AppProps } from "next/app";
import type { FC } from "react";
import { Loader } from "@components/common";
import { HeadDefault } from "@components/common";
import { ThemeProvider } from "next-themes";
import Head from "next/head";

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  return (
    <ThemeProvider attribute="class">
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <Layout>
        <HeadDefault />
        <Loader />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
