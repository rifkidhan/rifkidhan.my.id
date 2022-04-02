import { FC } from "react";
import s from "./Breadcrumb.module.css";

interface Banner {
  title: string;
}
const Breadcrumb: FC<Banner> = ({ title }) => {
  return (
    <section className={s.root}>
      <div className="isContainer">
        <h1>{title}</h1>
      </div>
    </section>
  );
};

export default Breadcrumb;
