import Image from "next/image";
import { imageUrl } from "@/libs/constant";
import { useEffect, useState, useRef, MutableRefObject } from "react";
import { m, useSpring, useTransform, useViewportScroll } from "framer-motion";
import Link from "next/link";
import s from "./HomeBlog.module.css";

type post = {
  title: string;
  image: string;
  content: any;
};
interface Post {
  id: any;
  title: string;
  feature_image: {
    id: string;
  };
  content: any;
  slug: string;
}

type Posts = {
  posts: Post[];
};

const svgVariants = {
  mouseEnter: {
    x: 5,
    transition: {
      x: {
        type: "bounce",
        repeat: Infinity,
        repeatType: "mirror",
        duration: 0.5,
      },
    },
  },
};
const wrapper = {
  mouseEnter: {
    scale: 1.05,
  },
};
const readMore = {
  mouseEnter: {
    y: 0,
    opacity: 1,
  },
  mouseLeave: {
    y: 300,
    opacity: 0,
  },
};

const PostHome = ({ title, content, image }: post) => {
  const [onHover, setOnHover] = useState<boolean>(false);
  // const [elementTop, setElementTop] = useState<number>(0);
  // const [clientHeight, setClientHeight] = useState<number>(0);

  // const ref = useRef() as MutableRefObject<HTMLDivElement>;

  // const { scrollY } = useViewportScroll();

  // const y = useTransform(
  //   scrollY,
  //   [elementTop - clientHeight, elementTop],
  //   [15, -15],
  //   {
  //     clamp: false,
  //   }
  // );

  // const ySpring = useSpring(y, { stiffness: 200, damping: 50 });

  // useEffect(() => {
  //   const element = ref.current;
  //   const onResize = () => {
  //     setElementTop(element.getBoundingClientRect().top + window.scrollY);
  //     setClientHeight(window.innerHeight);
  //   };
  //   onResize();
  //   window.addEventListener("resize", onResize);
  //   return () => {
  //     window.removeEventListener("resize", onResize);
  //   };
  // }, [ref]);

  return (
    <m.div
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      animate={onHover ? "mouseEnter" : "mouseLeave"}
      variants={wrapper}
      className="group"
    >
      <div className={s.postImage}>
        <Image
          src={`${imageUrl}/${image}`}
          layout="responsive"
          height={500}
          width={500}
          objectFit="cover"
          alt={`Image from ${title}`}
          sizes="50vw"
        />
      </div>
      <m.div className={s.postText}>
        <h3>{title}</h3>
        <div
          className={s.postTextDescription}
          dangerouslySetInnerHTML={{ __html: `${content}` }}
        />
        <m.div
          animate={onHover ? "mouseEnter" : "mouseLeave"}
          variants={readMore}
          className={s.postTextIcon}
        >
          Read more this article
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <m.path
              initial={false}
              animate={onHover ? "mouseEnter" : "mouseLeave"}
              variants={svgVariants}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </m.div>
      </m.div>
    </m.div>
  );
};

export default function BlogSection({ posts }: Posts) {
  return (
    <section className={s.root}>
      <div className={`${s.title}`}>
        <h2>This is my blogs.</h2>
      </div>
      <div className={`${s.posts}`}>
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} passHref>
            <m.a className={s.post} initial={false} whileInView={{ y: 10 }}>
              <PostHome
                title={post.title}
                content={post.content}
                image={post.feature_image.id}
              />
            </m.a>
          </Link>
        ))}
      </div>
      <Link href={`/blog`} passHref>
        <a className="block">Click here to more post</a>
      </Link>
    </section>
  );
}
