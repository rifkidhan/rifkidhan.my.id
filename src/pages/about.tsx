<<<<<<< HEAD
import Layout from "@/components/Layout";
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import type { ReactElement } from "react";
import { NextSeo } from "next-seo";
import { getAboutData } from "@/libs/data/queries";
import { imageUrl } from "@/libs/constant";
import Image from "next/image";
import { Breadcrumb } from "@/components/display";

const AboutPage = ({
	about,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<div className="page-wrapper page-wrapper__atCenter">
			<NextSeo title={about.title} />
			<Breadcrumb title={about.title} />
			<div className="flex flex-col md:flex-row md:min-h-screen gap-10 items-center justify-center isContainer">
				<div className="rounded-full overflow-hidden w-32 h-32">
					<div className="relative w-full h-full">
						<Image
							src={`${imageUrl}/${about.image.id}`}
							layout="fill"
							objectFit="cover"
						/>
					</div>
				</div>
				<div>
					<div
						className="prose"
						dangerouslySetInnerHTML={{ __html: `${about.description}` }}
					/>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;

export async function getStaticProps({}: GetStaticPropsContext) {
	const about = await getAboutData();

	return {
		props: {
			about,
		},
	};
}

AboutPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
=======
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
>>>>>>> 9e54861 (Initial Commit)
