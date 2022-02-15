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
