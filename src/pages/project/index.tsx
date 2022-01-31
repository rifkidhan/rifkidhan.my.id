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
