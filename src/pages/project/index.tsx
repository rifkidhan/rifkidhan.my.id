<<<<<<< HEAD
import Layout from "@/components/Layout";
import type { ReactElement } from "react";
import { NextSeo } from "next-seo";
import { Breadcrumb, Loader } from "@/components/display";
import dynamic from "next/dynamic";

const ProjectPage = () => {
	const Yoga = dynamic(() => import("@/components/lottie/Yoga"), {
		ssr: false,
	});

	return (
		<div className="page-wrapper page-wrapper__atCenter">
			<NextSeo title="My Project" />
			<Loader />
			<Breadcrumb title={"My Project"} />
			<div className="isContainer flex flex-col items-center mb-10">
				<Yoga />
				<h2 className="font-bold mb-5">Oh Tidaaakk!</h2>
				<p>Saya lupa jika saya tidak memiliki project apapun</p>
			</div>
		</div>
	);
};

export default ProjectPage;

ProjectPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
=======
import Layout from "@/components/Layout";
import type { ReactElement } from "react";
import { NextSeo } from "next-seo";

const ProjectPage = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen gap-10">
			<NextSeo title="My Project" />
			<div>Project Page</div>
		</div>
	);
};

export default ProjectPage;

ProjectPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
>>>>>>> 9e54861 (Initial Commit)
