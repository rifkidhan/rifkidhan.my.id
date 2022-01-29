import type { ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

const Section = ({ children }: Props) => {
	return <div className="container mx-auto px-10">{children}</div>;
};

export default Section;
