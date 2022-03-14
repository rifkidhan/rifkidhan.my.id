import type { ReactNode } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { Footer, HeaderBlack as Header } from "@/components/display";
import BackToTop from "@/components/icons/BackToTop";

type Props = {
  children?: ReactNode;
};

export const Layout = ({ children }: Props) => {
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
