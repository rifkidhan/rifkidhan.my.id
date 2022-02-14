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
		<div className="flex flex-col items-center justify-center min-h-screen gap-10">
			<NextSeo title={about.title} />
			<Breadcrumb title={about.title} />
			<div className="flex flex-row min-h-screen gap-10 items-center justify-center">
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
