import { FC } from "react";
import { NextSeo } from "next-seo";
import { url } from "@/libs/siteConfig";
import { imageUrl } from "@/libs/constant";

interface Props {
  title: string;
  description: string;
  slug: string;
  firstName: string;
  lastName: string;
  userName: string;
  gender: string;
  images: string;
  width?: number;
  height?: number;
}

const ProfileSeo: FC<Props> = ({
  title,
  description,
  slug,
  firstName,
  lastName,
  userName,
  gender,
  images,
  width,
  height,
}) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title: title,
          description: description,
          url: url + slug,
          type: "profile",
          profile: {
            firstName: firstName,
            lastName: lastName,
            username: userName,
            gender: gender,
          },
          images: [
            {
              url: `${imageUrl}/${images}`,
              width: width,
              height: height,
              alt: title,
            },
          ],
        }}
      />
    </>
  );
};

export default ProfileSeo;
