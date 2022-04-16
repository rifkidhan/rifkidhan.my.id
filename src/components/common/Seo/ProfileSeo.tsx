import { FC } from "react";
import { NextSeo } from "next-seo";
import { url } from "@libs/siteConfig";
import { imageUrl } from "@libs/constant";

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

const ProfileSeo: FC<Props> = (props) => {
  return (
    <>
      <NextSeo
        title={props.title}
        description={props.description}
        openGraph={{
          title: props.title,
          description: props.description,
          url: url + props.slug,
          type: "profile",
          profile: {
            firstName: props.firstName,
            lastName: props.lastName,
            username: props.userName,
            gender: props.gender,
          },
          images: [
            {
              url: `${imageUrl}/${props.images}`,
              width: props.width,
              height: props.height,
              alt: props.title,
            },
          ],
        }}
      />
    </>
  );
};

export default ProfileSeo;
