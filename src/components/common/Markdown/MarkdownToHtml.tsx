import { FC, Fragment, useState } from "react";
import Markdown from "markdown-to-jsx";
import s from "./MarkdownToHtml.module.css";
import Image from "next/image";

interface Images {
  src: string;
  title: string;
  alt: string;
}

interface Props {
  content: string;
}

const Images: FC<Images> = ({ src, title, alt }) => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className={`${s.image}`}>
      <Image
        src={`${src}?key=convert-webp`}
        layout="fill"
        objectFit="cover"
        title={title}
        alt={alt}
        priority
        className={
          loading
            ? "scale-110 blur-2xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        }
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};

const MarkdownToHtml: FC<Props> = ({ content }) => {
  return (
    <Markdown
      className={s.body}
      options={{
        wrapper: "article",
        overrides: {
          img: Images,
          p: {
            component: (props) => {
              return props.children.some(
                (child: JSX.Element) => child.type && child.type === Images
              ) ? (
                <Fragment>{props.children}</Fragment>
              ) : (
                <p {...props} />
              );
            },
          },
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownToHtml;
