import { imageUrl } from "@libs/directus";
import Image from "next/image";
import { FC, useState } from "react";
import s from "./Profile.module.css";

interface Props {
  image: string;
  description: string;
}

const Profile: FC<Props> = ({ image, description }) => {
  const [loading, setLoading] = useState<boolean>(true);
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
            alt="Rifki Ramadhan"
            priority
            className={
              loading
                ? "scale-110 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            }
            onLoadingComplete={() => setLoading(false)}
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
