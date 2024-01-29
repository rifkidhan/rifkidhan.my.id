//@ts-expect-error
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
//@ts-expect-error
import { jsxDEV } from 'react/jsx-dev-runtime'
import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeReact from 'rehype-react'
import type { Components } from 'rehype-react'
import Link from 'next/link'
import Image from 'next/image'

const customComponent: Partial<Components> = {
  a: (props) => {
    const href = props.href

    if (href?.startsWith('/')) {
      return <Link href={href}>{props.children}</Link>
    }
    if (href?.startsWith('#')) {
      return <a {...props} />
    }
    return <a target="_blank" rel="noopener noreferrer" {...props} />
  },
  img: (props) => {
    const { src, height, alt, width } = props
    if (src && alt) {
      if (height && width)
        return (
          <Image
            src={src}
            alt={alt}
            height={Number(height)}
            width={Number(width)}
          />
        )
      return (
        <div className="flex flex-col">
          <Image
            src={src}
            alt={alt}
            sizes="100vw"
            width={500}
            height={500}
            style={{
              width: '100%',
              height: 'auto'
            }}
          />
        </div>
      )
    }
  }
}

const Content = async ({ content }: { content: string }) => {
  const file = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSanitize)
    .use(rehypeReact, {
      Fragment,
      jsx,
      jsxs,
      jsxDEV,
      development: process.env.node === 'development',
      components: customComponent
    })
    .process(content)

  return file.result
}

export default Content
