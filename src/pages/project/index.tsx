import { Layout, Breadcrumb, BaseSeo } from "@/components/common";
import type { ReactElement } from "react";
import { LoadingDots } from "@/components/common";
import dynamic from "next/dynamic";

const Loading = () => (
  <div className="loading">
    <LoadingDots />
  </div>
);

const dynamicProps = {
  loading: Loading,
  ssr: false,
};

const ProjectPage = () => {
  const Yoga = dynamic(() => import("@/components/common/Lottie"), {
    ...dynamicProps,
  });

  return (
    <div className="page-wrapper page-wrapper__atCenter">
      <BaseSeo
        title="Rifki Ramadhan Project"
        description="All project created by Rifki Ramadhan"
        slug="/project"
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
