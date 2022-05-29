import { Layout, Breadcrumb, LoadingDots, SEO } from '@components/common';
import dynamic from 'next/dynamic';

const Loading = () => (
  <div className="loading">
    <LoadingDots />
  </div>
);

const dynamicProps = {
  loading: Loading,
  ssr: false
};

const ProjectPage = () => {
  const Yoga = dynamic(() => import('@components/common/Lottie'), {
    ...dynamicProps
  });

  return (
    <div className="page-wrapper page-wrapper__atCenter">
      <SEO
        title="Project"
        description="Project by Rifki Ramadhan"
        openGraph={{
          title: 'Project',
          description: 'Project by Rifki Ramadhan'
        }}
      />
      <Breadcrumb title={'My Project'} />
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

ProjectPage.Layout = Layout;
