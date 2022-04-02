import { Layout, Breadcrumb } from "@/components/common";
import type { ReactElement } from "react";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";

const ProjectPage = () => {
  const Yoga = dynamic(() => import("@/components/common/Lottie"), {
    ssr: false,
  });

  return (
    <div className="page-wrapper page-wrapper__atCenter">
      <NextSeo
        title="My Project"
        description="All project create by Rifki Ramadhan"
      />
      <Breadcrumb title={"My Project"} />
      <div className="isContainer mb-10 flex flex-col items-center gap-10">
        <div className="w-1/2">
          <Yoga src="lottie/WorkAndBalance.lottie" />
        </div>
        <div className="text-center">
          <h2 className="font-bold">Oh Tidaaakk!</h2>
          <p>Saya lupa jika saya tidak memiliki project apapun</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;

ProjectPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
