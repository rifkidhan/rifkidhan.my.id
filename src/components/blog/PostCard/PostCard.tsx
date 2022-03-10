import s from "./PostCard.module.css";
import Image from "next/image";
import { imageUrl } from "@/libs/constant";
import Link from "next/link";

type Props = {
  title: string;
  slug: string;
  image: string;
  content: string;
};

export default function PostCard({ slug, image, content, title }: Props) {
  return (
    <Link href={`/blog/${slug}`}>
      <a>
        <div className={`${s.wrapper} group`}>
          <div className={`${s.image} group-hover:grayscale-0`}>
            <Image
              src={`${imageUrl}/${image}`}
              layout="fill"
              objectFit="cover"
              alt={`Image From ${title}`}
              loading="lazy"
            />
          </div>
          <div className={s.text}>
            <h4 className={`${s.textTitle} group-hover:text-orange-600`}>
              {title}
            </h4>
            <div
              className={s.textBody}
              dangerouslySetInnerHTML={{ __html: `${content}` }}
            />
          </div>
        </div>
      </a>
    </Link>
  );
}
