import { useEffect, useState } from "react";
import Link from "next/link";
import debounce from "@/libs/debounce";
import { motion } from "framer-motion";
import { fetcher } from "@/libs/api";
import { getMenu } from "@/libs/data/queries";
import useSWR from "swr";

// type section

type MenuItemsType = {
	changeToggle: any;
};
type MenuToggleType = {
	toggle: any;
};

// variants section

const sidebar = {
	open: {
		x: "0%",
		transition: {
			ease: "easeInOut",
			duration: 0.5,
		},
		display: "grid",
	},
	closed: {
		x: "100%",
		transition: {
			delay: 0.8,
			ease: "easeInOut",
			duration: 0.5,
		},
		transitionEnd: {
			display: "none",
		},
	},
};
const navigation = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.3 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
};
const menuItems = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 },
		},
	},
};

// menu items section

const MenuItems = ({ changeToggle }: MenuItemsType) => {
	const { data } = useSWR(getMenu, fetcher);

	return (
		<motion.nav variants={sidebar} className="menu">
			<div className="container mx-auto px-10 md:px-24 lg:px-32 xl:px-56 2xl:px-72">
				<motion.div variants={navigation} className="flex flex-col gap-7 pt-24">
					{data?.menu.map((menu: any) => (
						<motion.div
							variants={menuItems}
							className="border-b-2 pb-10"
							key={menu.id}
						>
							<Link href={`/${menu.slug}`} passHref>
								<a
									className="text-7xl menu_link font-serif"
									onClick={changeToggle}
								>
									{menu.title}
								</a>
							</Link>
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.nav>
	);
};

// toggle menu section

const Path = (props: any) => (
	<motion.path strokeWidth="2" strokeLinecap="round" {...props} />
);

const MenuToggle = ({ toggle }: MenuToggleType) => {
	return (
		<div className="z-100 relative">
			<button onClick={toggle} aria-label="Menu">
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-10 w-10"
					fill="none"
					viewBox="0 0 24 24"
					variants={{
						closed: { stroke: "#1c1917" },
						open: { stroke: "#fafaf9" },
					}}
				>
					<Path
						variants={{
							closed: { d: "M 2 2.5 L 20 2.5" },
							open: { d: "M 3 16.5 L 17 2.5" },
						}}
					/>
					<Path
						d="M 2 9.423 L 20 9.423"
						variants={{
							closed: { opacity: 1 },
							open: { opacity: 0 },
						}}
						transition={{ duration: 0.1 }}
					/>
					<Path
						variants={{
							closed: { d: "M 2 16.346 L 20 16.346" },
							open: { d: "M 3 2.5 L 17 16.346" },
						}}
					/>
				</motion.svg>
			</button>
		</div>
	);
};

// all menu component here

const Menu = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		const bodyLock = document.querySelector("body") as HTMLElement;

		if (isOpen === true) {
			bodyLock.classList.add("scroll-lock");
		}
		return () => {
			bodyLock.classList.remove("scroll-lock");
		};
	});

	return (
		<motion.div initial={false} animate={isOpen ? "open" : "closed"}>
			<MenuToggle toggle={() => setIsOpen(!isOpen)} />
			<MenuItems changeToggle={() => setIsOpen(false)} />
		</motion.div>
	);
};

// header section

export default function Header() {
	const [visible, setVisible] = useState(true);
	const [isTop, setIsTop] = useState<boolean>(false);
	const [prevScrollPos, setPrevScrollPos] = useState(0);

	useEffect(() => {
		const scrollHandler = debounce(() => {
			const currentScrollPos = window.scrollY;

			setVisible(
				(prevScrollPos > currentScrollPos &&
					prevScrollPos - currentScrollPos > 70) ||
					currentScrollPos < 10
			);
			setIsTop(currentScrollPos < 100);

			setPrevScrollPos(currentScrollPos);
		}, 100);
		window.addEventListener("scroll", scrollHandler);
		return () => {
			window.removeEventListener("scroll", scrollHandler);
		};
	}, [prevScrollPos, visible, isTop]);

	return (
		<header
			className={`${visible ? "navbar_active" : "navbar_inactive"} ${
				isTop
					? "bg-transparent border-stone-50"
					: "bg-stone-50 border-stone-900"
			} header`}
		>
			<div className="flex flex-row justify-between container">
				<Link href={"/"}>
					<a
						className="							 text-stone-900
						 text-4xl font-sans font-medium"
					>
						Rifkidhan
					</a>
				</Link>
				<Menu />
			</div>
		</header>
	);
}
