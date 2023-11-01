import { rehype } from 'rehype'
import rehypePrettyCode from 'rehype-pretty-code'
import type { Options } from 'rehype-pretty-code'

const prettyCodeOptions: Options = {
  theme: {
    dark: 'light-plus',
    light: 'dark-plus'
  }
}

export const htmlParser = async (source: string) => {
  const file = await rehype().process(source)

  // const file = await rehype()
  //   .use(rehypePrettyCode, prettyCodeOptions)
  //   .process(source)

  return String(file)
}
