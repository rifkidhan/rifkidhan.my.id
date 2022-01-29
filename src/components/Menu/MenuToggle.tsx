import { motion } from "framer-motion";

type Props = {
	toggle: any;
};
const Path = (props: any) => (
	<motion.path strokeWidth="2" strokeLinecap="round" {...props} />
);
export default function MenuToggle({ toggle }: Props) {
	return (
		<div className="z-100 relative">
			<button onClick={toggle} aria-label="Menu">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-10 w-10"
					fill="none"
					viewBox="0 0 24 24"
				>
					<Path
						variants={{
							closed: { d: "M 2 2.5 L 20 2.5", stroke: "#1c1917" },
							open: { d: "M 3 16.5 L 17 2.5", stroke: "#e7e5e4" },
						}}
					/>
					<Path
						d="M 2 9.423 L 20 9.423"
						variants={{
							closed: { opacity: 1, stroke: "#1c1917" },
							open: { opacity: 0, stroke: "#e7e5e4" },
						}}
						transition={{ duration: 0.1 }}
					/>
					<Path
						variants={{
							closed: { d: "M 2 16.346 L 20 16.346", stroke: "#1c1917" },
							open: { d: "M 3 2.5 L 17 16.346", stroke: "#e7e5e4" },
						}}
					/>
				</svg>
			</button>
		</div>
	);
}
