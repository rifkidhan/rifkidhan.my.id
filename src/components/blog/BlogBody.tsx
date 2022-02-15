export default function BlogBody({ content }: any) {
	return (
		<div
			className="prose max-w-none lg:prose-xl"
			dangerouslySetInnerHTML={{ __html: `${content}` }}
		/>
	);
}
