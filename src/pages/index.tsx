import type { ReactElement } from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Layout from "@/components/Layout";
import { getPostForHome } from "@/libs/data/queries";
import { HeroSection, BlogSection } from "@/components/home";

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen gap-10">
			<HeroSection />
			<BlogSection posts={posts} />
			<HeroSection />
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
