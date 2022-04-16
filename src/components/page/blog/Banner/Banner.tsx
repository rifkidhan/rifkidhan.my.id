import s from "./Banner.module.css";
import Image from "next/image";
import { imageUrl } from "@libs/directus";
import { FC, useState } from "react";

interface Props {
  title: string;
  image: string;
}

const Banner: FC<Props> = ({ image, title }) => {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <section className={s.root}>
      <Image
        src={`${imageUrl}/${image}`}
        alt={`Image From ${title}`}
        layout="fill"
        objectFit="cover"
        priority
        className={
          loading
            ? "scale-110 blur-2xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        }
        onLoadingComplete={() => setLoading(false)}
      />
    </section>
  );
};

export default Banner;
