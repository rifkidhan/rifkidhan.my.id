import s from "./CategoryButton.module.css";

export default function CategoryButton({ onClick, title }: any) {
  return (
    <button
      onClick={onClick}
      className={s.root}
      aria-label={`${title} category button`}
    >
      <div className={`${s.Bg} ${s.Item}`}>
        <div className={s.Item_title}>{title}</div>
      </div>
    </button>
  );
}
