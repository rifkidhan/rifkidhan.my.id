import '@styles/globals.css';
import type { AppProps } from 'next/app';
import type { FC } from 'react';
import { Loader, Head } from '@components/common';
import { ThemeProvider } from 'next-themes';

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  return (
    <>
      <Head />
      <ThemeProvider attribute="class">
        <Layout>
          <Loader />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
