export default function CategoryButton({ onClick, title }: any) {
	return (
		<button onClick={onClick} className="cursor-pointer">
			<div className="category_button_bg category_button group flex items-center justify-center">
				<div className="block text-center group-hover:text-stone-200">
					{title}
				</div>
			</div>
		</button>
	);
}
