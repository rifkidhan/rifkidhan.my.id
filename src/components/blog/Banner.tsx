<<<<<<< HEAD
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
=======
import Image from "next/image";
import { imageUrl } from "@/libs/constant";

type Props = {
	title: string;
	image: string;
};

export default function Banner({ image, title }: Props) {
	return (
		<div>
			<div className="relative w-full h-96 md:h-[36rem] lg:h-[42rem] xl:[48rem]">
				<Image
					src={`${imageUrl}/${image}`}
					alt={`Image From ${title}`}
					layout="fill"
					objectFit="cover"
					priority
				/>
			</div>
		</div>
	);
}
>>>>>>> 9e54861 (Initial Commit)
