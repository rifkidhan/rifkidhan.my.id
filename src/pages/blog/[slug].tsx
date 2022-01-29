<<<<<<< HEAD
import type {
	GetStaticPropsContext,
	GetStaticPathsContext,
	InferGetStaticPropsType,
} from "next";
import { getBlogPost, getBlogPostBySlug } from "@/libs/data/queries";
import Layout from "@/components/Layout";
import { Banner, BlogTitle, BlogBody } from "@/components/blog";
import { BackIcon } from "@/components/icons";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { NextSeo } from "next-seo";

export default function BlogDetails({
	post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();
	return (
		<div className="page-wrapper">
			{post?.map((item: any) => (
				<div key={item.id}>
					<NextSeo title={`${item.title}`} />
					<Banner title={item.title} image={item.feature_image.id} />
					<section className="post isContainer">
						<button
							type="button"
							onClick={() => router.back()}
							aria-label="Back button"
						>
							<BackIcon />
						</button>
						<BlogTitle title={item.title} subtitle={item.subtitle} />
						<BlogBody content={item.content} />
					</section>
				</div>
			))}
		</div>
	);
}

export async function getStaticPaths({}: GetStaticPathsContext) {
	const getPost = await getBlogPostBySlug();

	return {
		paths: getPost.map((post: any) => `/blog/${post.slug}`),
		fallback: true,
	};
}

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ slug: string }>) {
	const post = await getBlogPost(params!.slug);

	return {
		props: {
			post,
		},
	};
}

BlogDetails.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
=======
import type {
	GetStaticPropsContext,
	GetStaticPathsContext,
	InferGetStaticPropsType,
} from "next";
import { getBlogPost, getBlogPostBySlug } from "@/libs/data/queries";
import Layout from "@/components/Layout";
import { Banner, BlogTitle, BlogBody } from "@/components/blog";
import { Container } from "@/components/display";
import { BackIcon } from "@/components/icons";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { NextSeo } from "next-seo";

export default function BlogDetails({
	post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();
	return (
		<div className="flex flex-col gap-10">
			{post?.map((item: any) => (
				<div key={item.id}>
					<NextSeo title={`${item.title}`} />
					<div>
						<Banner title={item.title} image={item.feature_image.id} />
						<Container>
							<div className="flex flex-col my-14 gap-16">
								<button type="button" onClick={() => router.back()}>
									<BackIcon />
								</button>
								<BlogTitle title={item.title} subtitle={item.subtitle} />
								<BlogBody content={item.content} />
							</div>
						</Container>
					</div>
				</div>
			))}
		</div>
	);
}

export async function getStaticPaths({}: GetStaticPathsContext) {
	const getPost = await getBlogPostBySlug();

	return {
		paths: getPost.map((post: any) => `/blog/${post.slug}`),
		fallback: true,
	};
}

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ slug: string }>) {
	const post = await getBlogPost(params!.slug);

	return {
		props: {
			post,
		},
	};
}

BlogDetails.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};
>>>>>>> 9e54861 (Initial Commit)
