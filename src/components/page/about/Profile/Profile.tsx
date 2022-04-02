import { imageUrl } from "@/libs/constant";
import Image from "next/image";
import { FC } from "react";
import s from "./Profile.module.css";

interface Props {
  image: string;
  description: string;
}

const Profile: FC<Props> = ({ image, description }) => {
  return (
    <section className={`${s.wrapper} isContainer`}>
      <div className={s.image}>
        <div>
          <Image
            src={`${imageUrl}/${image}`}
            width={500}
            height={500}
            layout="responsive"
            objectFit="cover"
            alt="Pemilik"
            loading="lazy"
          />
        </div>
      </div>
      <div className={s.description}>
        <div dangerouslySetInnerHTML={{ __html: `${description}` }} />
      </div>
    </section>
  );
};

export default Profile;
