import type { FC, ReactNode } from "react";
import { Footer, Header, BackToTop } from "@components/common";

interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <BackToTop />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
