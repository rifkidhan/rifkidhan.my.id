import type { ReactElement } from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Layout from "@/components/Layout";
import { getPostForHome } from "@/libs/data/queries";
import { HeroSection, BlogSection } from "@/components/home";

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<div className="page-wrapper page-wrapper__atCenter">
			<HeroSection />
			<BlogSection posts={posts} />
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
