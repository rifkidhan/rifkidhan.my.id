import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function BackToTop() {
	const [isShow, setIsShow] = useState(false);
	const [scrollPosition, setScrollPostition] = useState(0);

	useEffect(() => {
		const backTopTopButtonShow = () => {
			const scrollPos = window.scrollY;
			setScrollPostition(scrollPos);

			setIsShow(scrollPosition > 500);
		};
		window.addEventListener("scroll", backTopTopButtonShow);
		return () => {
			window.removeEventListener("scroll", backTopTopButtonShow);
		};
	}, [isShow, scrollPosition]);

	const backToTopButton = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className={`backToTop ${isShow ? "visible" : "invisible"}`}>
			<motion.button
				initial={false}
				whileHover={{
					y: -7,
					transition: {
						repeat: Infinity,
						repeatType: "reverse",
						duration: 0.5,
						type: "spring",
						bounce: 0.25,
					},
				}}
				aria-label="Back To Top Button"
				onClick={backToTopButton}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M5 10l7-7m0 0l7 7m-7-7v18"
					/>
				</svg>
			</motion.button>
		</div>
	);
}
