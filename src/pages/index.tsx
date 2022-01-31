import type { ReactElement } from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Layout from "@/components/Layout";
import { getPostForHome } from "@/libs/data/queries";
import { HeroSection, Section } from "@/components/home";
import dynamic from "next/dynamic";

const BlogSectionDynamic = dynamic(
	() => import("@/components/home/BlogSection")
);

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen gap-10 overflow-x-hidden">
			<HeroSection />
			<Section>
				{posts.map((post: any) => (
					<div key={post.id}>
						<BlogSectionDynamic
							title={post.title}
							image={post.feature_image.id}
							content={post.content}
						/>
					</div>
				))}
			</Section>
		</div>
	);
};

export const getStaticProps = async ({}: GetStaticPropsContext) => {
	const posts = await getPostForHome();

	return {
		props: {
			posts,
		},
		revalidate: 60,
	};
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};