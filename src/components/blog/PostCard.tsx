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
				<div className="postCard group">
					<div className="postCard_image">
						<Image
							src={`${imageUrl}/${image}`}
							layout="fill"
							objectFit="cover"
							alt={`Image From ${title}`}
						/>
					</div>
					<div className="postCard_text">
						<h5 className="postCard_text_title">{title}</h5>
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
