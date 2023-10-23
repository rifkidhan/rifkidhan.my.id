import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { Code } from 'bright'

Code.theme = {
  dark: 'light-plus',
  light: 'dark-plus',
  lightSelector: 'html.light'
}

const Components = { pre: Code }

const MDX = ({ source }: { source: string }) => {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [[remarkGfm]]
        }
      }}
      components={Components}
    />
  )
}

export default MDX
