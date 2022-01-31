import Layout from "@/components/Layout";
import type { ReactElement } from "react";
import { NextSeo } from "next-seo";

const AboutPage = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen gap-10">
			<NextSeo title="About Me" />
			<div>About Page</div>
		</div>
	);
};

export default AboutPage;

AboutPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
