<<<<<<< HEAD
type Props = {
	title: string;
	subtitle: string;
};

export default function BlogTitle({ title, subtitle }: Props) {
	return (
		<div className="post_title">
			<h1>{title}</h1>
			<h2>{subtitle}</h2>
		</div>
	);
}
=======
type Props = {
	title: string;
	subtitle: string;
};

export default function BlogTitle({ title, subtitle }: Props) {
	return (
		<div className="flex flex-col gap-7 py-2 text-center lg:gap-16">
			<h1>{title}</h1>
			<p className="text-xl lg:text-2xl 2xl:text-4xl">{subtitle}</p>
		</div>
	);
}
>>>>>>> 9e54861 (Initial Commit)
