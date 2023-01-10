'use client'

import { FC, Fragment, useEffect, useState } from 'react'

import Refractor from 'react-refractor'
import Prism from 'prismjs'
import Markdown from 'markdown-to-jsx'
import Image from 'next/image'
import js from 'refractor/lang/javascript'
import jsx from 'refractor/lang/jsx'
import ts from 'refractor/lang/typescript'
import tsx from 'refractor/lang/tsx'
import json from 'refractor/lang/json'
import css from 'refractor/lang/css'
import markup from 'refractor/lang/markup'
import md from 'refractor/lang/markdown'
import rust from 'refractor/lang/rust'
import s from './Markdown.module.css'

const Images: FC<{ src: string; title: string; alt: string }> = ({
  src,
  title,
  alt
}) => {
  return (
    <div className={s.image}>
      <Image
        src={src}
        title={title}
        alt={alt}
        sizes="100vw"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}

const CodeBlock = ({ children }: { children: any }) => {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [mounted])

  if (!mounted) return null

  Refractor.registerLanguage(md)
  Refractor.registerLanguage(js)
  Refractor.registerLanguage(css)
  Refractor.registerLanguage(jsx)
  Refractor.registerLanguage(ts)
  Refractor.registerLanguage(tsx)
  Refractor.registerLanguage(json)
  Refractor.registerLanguage(markup)
  Refractor.registerLanguage(rust)

  const language = children.props.className.replace('lang-', '')
  return <Refractor language={language} value={children.props.children} />
}

const MarkdownToHtml: FC<{ content: string }> = ({ content }) => {
  return (
    <Markdown
      className={s.root}
      options={{
        wrapper: 'article',
        overrides: {
          img: Images,
          pre: {
            component: CodeBlock
          },
          p: {
            component: (props) => {
              return props.children.some(
                (child: JSX.Element) => child.type && child.type === Images
              ) ? (
                <Fragment>{props.children}</Fragment>
              ) : (
                <p {...props} />
              )
            }
          }
        }
      }}
    >
      {content}
    </Markdown>
  )
}

export default MarkdownToHtml
