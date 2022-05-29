import s from "./PostCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { imageUrl } from "@libs/directus";
import Markdown from "markdown-to-jsx";

interface Props {
  title: string;
  slug: string;
  image: string;
  content: string;
}

const PostCard: FC<Props> = ({ slug, image, content, title }) => {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <Link href={`/blog/${slug}`}>
      <a>
        <div className={`${s.wrapper} group`}>
          <div className={`${s.image} group-hover:grayscale-0`}>
            <Image
              src={`${imageUrl}/${image}?key=convert-webp`}
              layout="responsive"
              width={500}
              height={400}
              objectFit="cover"
              alt={`Image From ${title}`}
              priority
              className={
                loading
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              }
              onLoadingComplete={() => setLoading(false)}
            />
          </div>
          <div className={s.text}>
            <h4 className={`${s.textTitle} group-hover:text-orange-600`}>
              {title}
            </h4>
            <p className={s.textBody}>{content}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default PostCard;
