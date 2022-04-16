import NProgress from "nprogress";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const Loader: FC = () => {
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const configure = () => {
      NProgress.configure({ showSpinner: false });
    };

    configure();

    const start = () => {
      timeout = setTimeout(NProgress.start, 100);
    };

    const done = () => {
      clearTimeout(timeout);
      NProgress.done();
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
    };
  }, []);

  return <></>;
};

export default Loader;
