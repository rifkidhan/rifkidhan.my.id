<<<<<<< HEAD
export default function CategoryButton({ onClick, title }: any) {
	return (
		<button
			onClick={onClick}
			className="category_button"
			aria-label={`${title} category button`}
		>
			<div className="category_button_item_bg category_button_item group">
				<div className="category_button_item_title">{title}</div>
			</div>
		</button>
	);
}
=======
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
>>>>>>> 9e54861 (Initial Commit)
