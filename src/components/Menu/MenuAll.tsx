import { useCycle, motion } from "framer-motion";
import { MenuToggle, MenuItems } from "@/components/Menu";
import { useEffect } from "react";

export default function Menu() {
	const [isOpen, toggleOpen] = useCycle<boolean>(false, true);

	useEffect(() => {
		if (isOpen === true) {
			document.querySelector("body").classList.add("scroll-lock");
		}
		return () => {
			document.querySelector("body").classList.remove("scroll-lock");
		};
	});

	return (
		<motion.div initial={false} animate={isOpen ? "open" : "closed"}>
			<MenuToggle toggle={() => toggleOpen()} />
			<MenuItems changeToggle={() => toggleOpen(false)} />
		</motion.div>
	);
}
