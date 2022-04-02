import s from "./Banner.module.css";
import Image from "next/image";
import { imageUrl } from "@/libs/constant";
import { FC } from "react";

interface Props {
  title: string;
  image: string;
}

const Banner: FC<Props> = ({ image, title }) => {
  return (
    <section className={s.root}>
      <Image
        src={`${imageUrl}/${image}`}
        alt={`Image From ${title}`}
        layout="fill"
        objectFit="cover"
        priority
      />
    </section>
  );
};

export default Banner;
