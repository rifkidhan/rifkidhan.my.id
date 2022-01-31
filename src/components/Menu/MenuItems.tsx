import * as React from "react";
import { fetcher } from "@/libs/api";
import { getMenu } from "@/libs/data/queries";
import { motion } from "framer-motion";
import Link from "next/link";
import useSWR from "swr";
import { Container } from "@/components/display";

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

export type Props = {
	changeToggle: any;
};
export default function MenuItems({ changeToggle }: Props) {
	const { data } = useSWR(getMenu, fetcher);

	return (
		<motion.nav variants={sidebar} className="menu">
			<Container>
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
			</Container>
		</motion.nav>
	);
}
