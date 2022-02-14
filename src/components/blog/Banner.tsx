import Image from "next/image";
import { imageUrl } from "@/libs/constant";

type Props = {
	title: string;
	image: string;
};

export default function Banner({ image, title }: Props) {
	return (
		<div>
			<div className="relative w-full grayscale h-96 md:h-[36rem] lg:h-[42rem] xl:[48rem]">
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
