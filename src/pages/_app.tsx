import "@styles/globals.css";
import type { AppProps } from "next/app";
import type { FC } from "react";
import { Loader } from "@components/common";
import { HeadDefault } from "@components/common";
import { ThemeProvider } from "next-themes";

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  return (
    <ThemeProvider attribute="class">
      <Layout>
        <HeadDefault />
        <Loader />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
