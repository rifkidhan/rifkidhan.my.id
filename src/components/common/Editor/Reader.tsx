'use client'

import type { EditorState, LexicalEditor } from 'lexical'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import s from './Editor.module.css'
import theme from './theme'
import { EditorNode } from './nodes'

type onChange = (editorState: EditorState, editor: LexicalEditor) => void

interface EditorProps {
  onChange?: onChange
  placeholder?: string
  editable?: boolean
  editorState: string
}

const Reader = ({
  placeholder = 'write something',
  editorState
}: EditorProps) => {
  const initialConfig = {
    namespace: 'rifkidhan-editor',
    onError: (error: Error) => {
      throw error
    },
    nodes: [...EditorNode],
    theme: theme,
    editable: false,
    editorState: editorState
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable autoCorrect={false} spellCheck={false} />
        }
        placeholder={<div className={s.placeholder}>{placeholder}</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </LexicalComposer>
  )
}

export default Reader
