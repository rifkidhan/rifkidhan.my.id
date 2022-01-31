import { useEffect, useState } from "react";
import { MenuAll } from "@/components/Menu";
import Link from "next/link";

export default function Header() {
	const [visible, setVisible] = useState(true);
	const [prevScrollPos, setPrevScrollPos] = useState(0);

	useEffect(() => {
		const debounce = (func: any, wait: any, immediate: any) => {
			let timeout: any;
			return function () {
				let context = this;
				let args = arguments;
				let later = function () {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				let callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		};

		const scrollHandler = debounce(() => {
			const currentScrollPos = window.pageYOffset;

			setVisible(
				(prevScrollPos > currentScrollPos &&
					prevScrollPos - currentScrollPos > 70) ||
					currentScrollPos < 10
			);

			setPrevScrollPos(currentScrollPos);
		}, 100);

		window.addEventListener("scroll", scrollHandler);
		return () => {
			window.removeEventListener("scroll", scrollHandler);
		};
	}, [prevScrollPos, visible]);

	return (
		<header
			className={`${visible ? "navbar_active" : "navbar_inactive"} header`}
		>
			<div className="flex flex-row justify-between container">
				<Link href={"/"}>
					<a className="text-4xl font-serif font-bold tracking-tight">
						RIFKIDHAN
					</a>
				</Link>
				<MenuAll />
			</div>
		</header>
	);
}
