import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
			<div className="isContainer">
				<motion.div variants={navigation} className="menu_item">
					{data?.menu.map((menu: any) => (
						<motion.div variants={menuItems} key={menu.id}>
							{menu.slug === "home" && (
								<Link href={`/`} passHref>
									<a onClick={changeToggle}>{menu.title}</a>
								</Link>
							)}
							{menu.slug !== "home" && (
								<Link href={`/${menu.slug}`} passHref>
									<a onClick={changeToggle}>{menu.title}</a>
								</Link>
							)}
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
		<div className="menu_toggle">
			<button onClick={toggle} aria-label="Menu">
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
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

const MenuToggleWhite = ({ toggle }: MenuToggleType) => {
	return (
		<div className="menu_toggle">
			<button onClick={toggle} aria-label="Menu">
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					variants={{
						closed: { stroke: "#fafaf9" },
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
	const router = useRouter();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isOnTop, setIsOnTop] = useState<boolean>(false);
	const [changeColor, setChangeColor] = useState<boolean>(false);

	useEffect(() => {
		const routerChange = () => {
			setChangeColor(router.pathname !== "/");
		};

		const scrollHandler = debounce(() => {
			const currentScrollPos = window.scrollY;
			setIsOnTop(currentScrollPos < 100);
		}, 100);

		routerChange();
		window.addEventListener("scroll", scrollHandler);

		return () => {
			window.removeEventListener("scroll", scrollHandler);
		};
	}, [isOnTop, changeColor, router]);

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
			{changeColor && isOnTop ? (
				<MenuToggleWhite toggle={() => setIsOpen(!isOpen)} />
			) : (
				<MenuToggle toggle={() => setIsOpen(!isOpen)} />
			)}
			<MenuItems changeToggle={() => setIsOpen(false)} />
		</motion.div>
	);
};

// header section

export default function Header() {
	const router = useRouter();
	const [visible, setVisible] = useState(true);
	const [isTop, setIsTop] = useState<boolean>(false);
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [changeColor, setChangeColor] = useState<boolean>(false);

	useEffect(() => {
		const routerChange = () => {
			setChangeColor(router.pathname !== "/");
		};
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

		routerChange();
		window.addEventListener("scroll", scrollHandler);
		return () => {
			window.removeEventListener("scroll", scrollHandler);
		};
	}, [prevScrollPos, visible, isTop, changeColor, router]);

	return (
		<header
			className={`header ${visible ? "navbar_active" : "navbar_inactive"} ${
				isTop ? "header_bgOnTop" : "header_bgOnScroll"
			} ${
				isTop && changeColor ? "header_border--white" : "header_border--black"
			}`}
		>
			<div className="header_inner">
				<Link href={"/"}>
					<a
						className={`${
							isTop && changeColor
								? "header_logoType--white"
								: "header_logoType--black"
						}`}
					>
						Rifkidhan
					</a>
				</Link>
				<Menu />
			</div>
		</header>
	);
}
