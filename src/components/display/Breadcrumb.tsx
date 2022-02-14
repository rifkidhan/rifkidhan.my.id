interface Banner {
	title: string;
}
export default function Breadcrumb({ title }: Banner) {
	return (
		<section className="w-full flex bg-stone-900 items-end justify-center h-screen">
			<div className="isContainer py-10">
				<h1 className="text-center text-stone-50">{title}</h1>
			</div>
		</section>
	);
}
