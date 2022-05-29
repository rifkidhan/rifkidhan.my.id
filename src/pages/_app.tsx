import '@styles/globals.css';
import type { AppProps } from 'next/app';
import type { FC, ReactNode } from 'react';
import { Loader, Head } from '@components/common';
import { ThemeProvider } from 'next-themes';

interface INoop {
  children?: ReactNode;
}
const Noop: FC<INoop> = ({ children }) => <>{children}</>;

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
