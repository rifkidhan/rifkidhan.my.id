import { makeSource } from 'contentlayer/source-files'
import { Blog } from './content/definitions/post'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import type { Options } from 'rehype-pretty-code'

const codeOptions: Options = {
  theme: {
    dark: 'github-dark-dimmed',
    light: 'github-light'
  }
}

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [[remarkGfm]],
    rehypePlugins: [[rehypePrettyCode, codeOptions]]
  }
})
