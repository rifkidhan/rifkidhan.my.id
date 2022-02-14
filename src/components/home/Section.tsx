import type { ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

const Section = ({ children }: Props) => {
	return (
		<section className="container mx-auto px-10 block relative">
			{children}
		</section>
	);
};

export default Section;
