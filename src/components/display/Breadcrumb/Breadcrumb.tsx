import s from "./Breadcrumb.module.css";

interface Banner {
  title: string;
}
export default function Breadcrumb({ title }: Banner) {
  return (
    <section className={s.root}>
      <div className="isContainer">
        <h1>{title}</h1>
      </div>
    </section>
  );
}
