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
