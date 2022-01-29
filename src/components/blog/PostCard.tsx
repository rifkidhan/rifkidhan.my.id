<<<<<<< HEAD
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
=======
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
					<div className="postcard_image group-hover:grayscale-0">
						<Image
							src={`${imageUrl}/${image}`}
							layout="fill"
							objectFit="cover"
							alt={`Image From ${title}`}
						/>
					</div>
					<div className="p-5 bg-white">
						<h5 className="group-hover:text-amber-400 transition ease-in-out duration-300">
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
>>>>>>> 9e54861 (Initial Commit)
