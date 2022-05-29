import { FC } from 'react';
import { SEO } from '@components/common';

const Head: FC = () => {
  return (
    <SEO>
      <meta
        key="viewport"
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <link rel="manifest" href="/manifest.json" key="site-manifest" />
      <meta
        key="application-name"
        name="application-name"
        content="Rifkidhan"
      />
      <meta
        key="apple-mobile-web-app-capable"
        name="apple-mobile-web-app-capable"
        content="yes"
      />
      <meta
        key="apple-mobile-web-app-status-bar-style"
        name="apple-mobile-web-app-status-bar-style"
        content="default"
      />
      <meta
        key="apple-mobile-web-app-title"
        name="apple-mobile-web-app-title"
        content="Rifkidhan"
      />
      <meta
        key="format-detection"
        name="format-detection"
        content="telephone=no"
      />
      <meta
        key="mobile-web-app-capable"
        name="mobile-web-app-capable"
        content="yes"
      />
      <meta
        key="msapplication-TileColor"
        name="msapplication-TileColor"
        content="#1c1917"
      />
      <meta
        key="msapplication-tap-highlight"
        name="msapplication-tap-highlight"
        content="no"
      />
      <meta key="theme-color" name="theme-color" content="#fafaf9" />
      <link
        key="apple-touch-icon"
        rel="apple-touch-icon"
        href="/icons/apple-touch-icon.png"
      />
      <link
        key="apple-touch-icon-152"
        rel="apple-touch-icon"
        sizes="152x152"
        href="/icons/apple-touch-icon-152.png"
      />
      <link
        key="apple-touch-icon-180"
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-touch-icon.png"
      />
      <link key="favicon" rel="shortcut icon" href="/favicon.ico" />
      <link
        key="favicon-32"
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-16x16.png"
      />
      <link
        key="favicon-16"
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        key="mask-icon"
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#1c1917"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
    </SEO>
  );
};

export default Head;
