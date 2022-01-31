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
