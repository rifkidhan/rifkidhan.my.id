import s from "./Body.module.css";

export default function BlogBody({ content }: any) {
  return (
    <div
      className={s.body}
      dangerouslySetInnerHTML={{ __html: `${content}` }}
    />
  );
}
