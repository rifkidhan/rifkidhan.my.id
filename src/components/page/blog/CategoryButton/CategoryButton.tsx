import { FC } from "react";
import s from "./CategoryButton.module.css";

interface Props {
  onClick: any;
  title: string;
}

const CategoryButton: FC<Props> = ({ onClick, title }) => {
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
};

export default CategoryButton;
