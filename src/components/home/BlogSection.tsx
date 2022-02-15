import Image from "next/image";
import { imageUrl } from "@/libs/constant";
import { useEffect, useState, useRef, MutableRefObject } from "react";
import {
	motion,
	useSpring,
	useTransform,
	useViewportScroll,
} from "framer-motion";
import Link from "next/link";

type post = {
	title: string;
	image: string;
	content: any;
	slug: string;
};
interface Post {
	id: any;
	title: string;
	feature_image: {
		id: string;
	};
	content: any;
	slug: string;
}

type Posts = {
	posts: Post[];
};

const svgVariants = {
	mouseEnter: {
		x: 5,
		transition: {
			x: {
				type: "bounce",
				repeat: Infinity,
				repeatType: "mirror",
				duration: 0.5,
			},
		},
	},
};

const wrapperImage = {
	initial: {
		width: "10%",
		height: "10%",
	},
	animate: {
		width: "100%",
		height: "80%",
		transition: {
			type: "spring",
			stiffness: 100,
			damping: 50,
		},
	},
};
const PostHome = ({ title, content, image, slug }: post) => {
	const [onHover, setOnHover] = useState<boolean>(false);
	const [elementTop, setElementTop] = useState<number>(0);
	const [clientHeight, setClientHeight] = useState<number>(0);

	const ref = useRef() as MutableRefObject<HTMLDivElement>;

	const { scrollY } = useViewportScroll();

	const y = useTransform(
		scrollY,
		[elementTop - clientHeight, elementTop],
		[20, -20],
		{
			clamp: false,
		}
	);

	const ySpring = useSpring(y, { stiffness: 200, damping: 50 });

	useEffect(() => {
		const element = ref.current;
		const onResize = () => {
			setElementTop(element.getBoundingClientRect().top + window.scrollY);
			setClientHeight(window.innerHeight);
		};
		onResize();
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, [ref]);

	return (
		<div className="home_blog_postSection" ref={ref}>
			<motion.div className="m-auto">
				<h3 className="w-full font-serif font-semibold mb-5 block">{title}</h3>
				<div
					className="prose max-w-none line-clamp-5 md:prose-xl"
					dangerouslySetInnerHTML={{ __html: `${content}` }}
				/>
				<Link href={`/blog/${slug}`} passHref>
					<a
						onMouseEnter={() => setOnHover(true)}
						onMouseLeave={() => setOnHover(false)}
						className="flex items-center w-fit gap-3 mt-5 hover:text-orange-500"
					>
						<p>Read More</p>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-10"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<motion.path
								initial={false}
								animate={onHover ? "mouseEnter" : "mouseLeave"}
								variants={svgVariants}
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</a>
				</Link>
			</motion.div>
			<div className="flex items-center mx-auto w-full md:w-4/5">
				<motion.div
					initial="initial"
					whileInView="animate"
					viewport={{ once: true }}
					variants={wrapperImage}
					className="overflow-hidden m-auto border border-stone-900 relative lg:aspect-1"
				>
					<motion.div
						style={{ y: ySpring }}
						className="relative w-full h-96 xl:h-screen"
					>
						<Image
							src={`${imageUrl}/${image}`}
							layout="fill"
							objectFit="cover"
							alt={`Image from ${title}`}
							priority
						/>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};

export default function BlogSection({ posts }: Posts) {
	return (
		<section className="relative w-full flex flex-col mx-auto items-center">
			<div className="py-5 w-1/2 text-center border border-stone-900 rounded-lg">
				<h2 className="italic">This is my blogs.</h2>
			</div>
			<div className="divide-y divide-stone-900 container mx-auto">
				{posts.map((post) => (
					<div key={post.id}>
						<PostHome
							title={post.title}
							content={post.content}
							image={post.feature_image.id}
							slug={post.slug}
						/>
					</div>
				))}
			</div>
		</section>
	);
}
// export default function BlogSection({ posts }: Posts) {
// 	const [onHover, setOnHover] = useState<boolean>(false);
// 	const [elementTop, setElementTop] = useState<number>(0);
// 	const [clientHeight, setClientHeight] = useState<number>(0);

// 	const ref = useRef() as MutableRefObject<HTMLDivElement>;

// 	const { scrollY } = useViewportScroll();

// 	const y = useTransform(scrollY, [elementTop, elementTop + 1], [0, 1], {
// 		clamp: false,
// 	});

// 	useEffect(() => {
// 		const element = ref.current;
// 		setElementTop(element.offsetTop);
// 	}, [ref]);
// 	console.log(ref);

// 	return (
// 		<section className="relative w-full flex flex-col mx-auto items-center">
// 			<div className="py-5 w-1/2 text-center border border-stone-900 rounded-lg">
// 				<h2 className="italic">This is my blogs.</h2>
// 			</div>
// 			<div className="divide-y divide-stone-900 container mx-auto">
// 				{posts.map((post) => (
// 					<div key={post.id} className="home_blog_postSection" ref={ref}>
// 						<motion.div className="m-auto">
// 							<h3 className="font-serif font-semibold mb-5 block">
// 								{post.title}
// 							</h3>
// 							<div
// 								className="prose max-w-none line-clamp-5 md:prose-xl"
// 								dangerouslySetInnerHTML={{ __html: `${post.content}` }}
// 							/>
// 							<Link href={`/blog/${post.slug}`} passHref>
// 								<a
// 									onMouseEnter={() => setOnHover(true)}
// 									onMouseLeave={() => setOnHover(false)}
// 									className="flex items-center w-fit gap-3 mt-5 hover:text-orange-500"
// 								>
// 									<div>Read More</div>
// 									<svg
// 										xmlns="http://www.w3.org/2000/svg"
// 										className="h-7 w-10"
// 										fill="none"
// 										viewBox="0 0 24 24"
// 										stroke="currentColor"
// 									>
// 										<motion.path
// 											initial={false}
// 											animate={onHover ? "mouseEnter" : "mouseLeave"}
// 											variants={svgVariants}
// 											strokeLinecap="round"
// 											strokeLinejoin="round"
// 											strokeWidth={2}
// 											d="M17 8l4 4m0 0l-4 4m4-4H3"
// 										/>
// 									</svg>
// 								</a>
// 							</Link>
// 						</motion.div>

// 						<motion.div
// 							initial="initial"
// 							whileInView="animate"
// 							viewport={{ once: true }}
// 							variants={wrapperImage}
// 							className="rounded-lg overflow-hidden m-auto relative lg:aspect-1"
// 						>
// 							<motion.div
// 								style={{ y: y }}
// 								className="relative w-full h-96 xl:h-screen"
// 							>
// 								<Image
// 									src={`${imageUrl}/${post.feature_image.id}`}
// 									layout="fill"
// 									objectFit="cover"
// 									alt={`Image from ${post.title}`}
// 									priority
// 								/>
// 							</motion.div>
// 						</motion.div>
// 					</div>
// 				))}
// 			</div>
// 		</section>
// 	);
// }
