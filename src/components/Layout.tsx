<<<<<<< HEAD
import type { ReactNode } from "react";
import { Footer, Header, Loader } from "@/components/display";
import BackToTop from "@/components/icons/BackToTop";

type Props = {
	children?: ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<div>
			<Header />
			<BackToTop />
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
=======
import type { ReactNode } from "react";
import { Footer, Header, Loader } from "@/components/display";
import BackToTop from "@/components/icons/BackToTop";

type Props = {
	children?: ReactNode;
};

export const Layout = ({ children }: Props) => {
	return (
		<div>
			<Header />
			<BackToTop />
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
>>>>>>> 9e54861 (Initial Commit)
