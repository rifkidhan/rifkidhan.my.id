<<<<<<< HEAD
export default function BlogBody({ content }: any) {
	return (
		<div
			className="prose max-w-none lg:prose-xl"
			dangerouslySetInnerHTML={{ __html: `${content}` }}
		/>
	);
}
=======
export default function BlogBody({ content }: any) {
	return (
		<div>
			<div
				className="prose max-w-none lg:prose-xl"
				dangerouslySetInnerHTML={{ __html: `${content}` }}
			/>
		</div>
	);
}
>>>>>>> 9e54861 (Initial Commit)
