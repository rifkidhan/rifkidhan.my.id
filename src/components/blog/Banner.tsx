import Image from "next/image";
import { imageUrl } from "@/libs/constant";

type Props = {
	title: string;
	image: string;
};

export default function Banner({ image, title }: Props) {
	return (
		<section className="post_banner">
			<Image
				src={`${imageUrl}/${image}`}
				alt={`Image From ${title}`}
				layout="fill"
				objectFit="cover"
				priority
			/>
		</section>
	);
}
