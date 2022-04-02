import type { FC, ReactNode } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { Footer, Header, BackToTop } from "@/components/common";

interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <LazyMotion features={domAnimation}>
      <Header />
      <BackToTop />
      <main>{children}</main>
      <Footer />
    </LazyMotion>
  );
};

export default Layout;
