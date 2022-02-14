import Image from "next/image";
import { imageUrl } from "@/libs/constant";
import Link from "next/link";

type Props = {
	title: string;
	slug: string;
	image: string;
	content: string;
};

export default function PostCard({ slug, image, content, title }: Props) {
	return (
		<Link href={`/blog/${slug}`}>
			<a>
				<div className="postcard group">
					<div className="postcard_image group-hover:grayscale-0 transition-all duration-300">
						<Image
							src={`${imageUrl}/${image}`}
							layout="fill"
							objectFit="cover"
							alt={`Image From ${title}`}
						/>
					</div>
					<div className="p-5">
						<h5 className="group-hover:text-orange-600 transition ease-in-out duration-300">
							{title}
						</h5>
						<div
							className="prose max-w-none line-clamp-4"
							dangerouslySetInnerHTML={{ __html: `${content}` }}
						/>
					</div>
				</div>
			</a>
		</Link>
	);
}
