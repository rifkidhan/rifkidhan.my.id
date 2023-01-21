import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { blurDataUrl } from '@libs/constants'
import remarkUnwrapImages from 'remark-unwrap-images'
import rehypeShiki from '@leafac/rehype-shiki'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import Link from 'next/link'
import { getHighlighter } from 'shiki'
import s from './Blog.module.css'

const components: MDXRemoteProps['components'] = {
  img: (props) => (
    <div className={s.image}>
      {props.src && props.alt && (
        <Image
          src={props.src}
          alt={props.alt}
          title={props.title}
          placeholder="blur"
          blurDataURL={blurDataUrl}
          fill
          className={s.imageItem}
        />
      )}
    </div>
  ),
  a: (props) => {
    const href = props.href
    const internalLink = href && (href.startsWith('/') || href.startsWith('#'))

    if (internalLink) {
      return <Link href={href}>{props.children}</Link>
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />
  }
}

export default async function MDXContent(props: MDXRemoteProps) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <MDXRemote
        {...props}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkUnwrapImages, remarkGfm],
            rehypePlugins: [
              [
                rehypeShiki,
                {
                  highlighter: await getHighlighter({
                    langs: ['javascript', 'typescript', 'tsx', 'bash'],
                    theme: 'css-variables'
                  })
                }
              ]
            ]
          }
        }}
        components={{ ...components, ...(props.components || {}) }}
      />
    </>
  )
}
