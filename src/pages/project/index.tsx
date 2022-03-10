import Layout from "@/components/Layout";
import type { ReactElement } from "react";
import { NextSeo } from "next-seo";
import { Breadcrumb } from "@/components/display";
import dynamic from "next/dynamic";

const ProjectPage = () => {
  const Yoga = dynamic(() => import("@/components/display/Lottie"), {
    ssr: false,
  });

  return (
    <div className="page-wrapper page-wrapper__atCenter">
      <NextSeo title="My Project" />
      <Breadcrumb title={"My Project"} />
      <div className="isContainer mb-10 flex flex-col items-center">
        <Yoga src="lottie/WorkAndBalance.lottie" />
        <h2 className="mb-5 font-bold">Oh Tidaaakk!</h2>
        <p>Saya lupa jika saya tidak memiliki project apapun</p>
      </div>
    </div>
  );
};

export default ProjectPage;

ProjectPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
