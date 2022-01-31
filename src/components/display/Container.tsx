import type { ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

export default function Container({ children }: Props) {
	return (
		<div className="container mx-auto px-10 md:px-24 lg:px-32 xl:px-56 2xl:px-72">
			{children}
		</div>
	);
}
