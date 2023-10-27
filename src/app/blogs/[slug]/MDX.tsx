import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import Image from 'next/image'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'
import { Code } from 'bright'

Code.theme = {
  dark: 'light-plus',
  light: 'dark-plus',
  lightSelector: 'html.light'
}

const CustomLink = (props: any) => {
  const href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

const NextImage = (props: any) => {
  return (
    <div className="aspect-h-4 aspect-w-6 relative overflow-hidden rounded-xl border-2 border-secondary">
      <Image
        {...props}
        sizes="(min-width: 808px) 50vw, 100vw"
        fill
        className="h-full w-full object-cover object-center"
      />
    </div>
  )
}

const Components = { pre: Code, a: CustomLink, img: NextImage }

const MDX = ({ source }: { source: string }) => {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [[remarkGfm], [remarkUnwrapImages]]
        }
      }}
      components={Components}
    />
  )
}

export default MDX
