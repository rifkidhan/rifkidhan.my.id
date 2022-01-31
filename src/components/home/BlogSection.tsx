import Image from "next/image";
import { imageUrl } from "@/libs/constant";
import { useEffect, useState, useRef, MutableRefObject } from "react";
import {
	useViewportScroll,
	motion,
	useTransform,
	useSpring,
} from "framer-motion";

type Props = {
	title: string;
	image: string;
	content: string;
};

export default function BlogSection({ title, image, content }: Props) {
	const [isShow, setIsShow] = useState<boolean>(false);
	const [elementTop, setElementTop] = useState<number>(0);
	const [clientHeight, setClientHeight] = useState<number>(0);

	const ref = useRef() as MutableRefObject<HTMLDivElement>;

	useEffect(() => {
		const element = ref.current;
		const onResize = () => {
			setElementTop(
				element.getBoundingClientRect().top + window.scrollY ||
					window.pageYOffset
			);
			setClientHeight(window.innerHeight);
		};
		onResize();
		window.addEventListener("scroll", onResize);
		return () => window.removeEventListener("scroll", onResize);
	}, [ref, elementTop, clientHeight]);

	const { scrollY } = useViewportScroll();

	const initial = elementTop - clientHeight;
	const final = elementTop;

	const scaleWrapper = useTransform(scrollY, [initial, final], [1, 1.2]);
	const spring = useSpring(scaleWrapper, { stiffness: 400, damping: 10 });

	return (
		<div
			ref={ref}
			className="flex flex-col gap-10 lg:min-h-screen lg:flex-row mb-16"
		>
			<motion.div className="md:basis-7/12">
				<p className="font-serif font-semibold text-5xl mb-5 block">{title}</p>
				<div
					className="prose max-w-none line-clamp-5 md:prose-xl"
					dangerouslySetInnerHTML={{ __html: `${content}` }}
				/>
			</motion.div>
			<motion.div className="overflow-hidden lg:basis-5/12 origin-center">
				<motion.div
					style={{ scale: spring }}
					className="relative block w-full h-72 lg:h-4/5"
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
	);
}
