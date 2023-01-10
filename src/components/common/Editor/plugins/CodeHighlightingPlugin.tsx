import { useEffect } from 'react'
import { registerCodeHighlighting } from '@lexical/code'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

export default function CodeHighlightingPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return () => {
      registerCodeHighlighting(editor)
    }
  }, [editor])

  return null
}
