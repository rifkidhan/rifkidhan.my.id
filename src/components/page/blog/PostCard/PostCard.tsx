import s from "./PostCard.module.css";
import Image from "next/image";
import { imageUrl } from "@/libs/constant";
import Link from "next/link";
import { FC } from "react";

interface Props {
  title: string;
  slug: string;
  image: string;
  content: string;
}

const PostCard: FC<Props> = ({ slug, image, content, title }) => {
  return (
    <Link href={`/blog/${slug}`}>
      <a>
        <div className={`${s.wrapper} group`}>
          <div className={`${s.image} group-hover:grayscale-0`}>
            <Image
              src={`${imageUrl}/${image}`}
              layout="responsive"
              width={500}
              height={400}
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
};

export default PostCard;
