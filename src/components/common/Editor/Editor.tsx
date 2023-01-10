'use client'

import { EditorState, LexicalEditor } from 'lexical'
import { useState } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import {
  ToolbarPlugin,
  AutoLinkPlugin,
  CodeHighlightingPlugin,
  HorizontalRulePlugin,
  LinkPlugin,
  FloatingLinkEditor
} from './plugins'
import s from './Editor.module.css'
import theme from './theme'
import { EditorNode } from './nodes'

type onChange = (editorState: EditorState, editor: LexicalEditor) => void

interface EditorProps {
  onChange?: onChange
  placeholder?: string
  editable?: boolean
  initialEditorState?: string
}

const Editor = ({
  onChange,
  placeholder = 'write something',
  editable = true,
  initialEditorState
}: EditorProps) => {
  const [floatingElement, setFloatingElement] = useState<HTMLDivElement | null>(
    null
  )

  const floating = (_floatingElement: HTMLDivElement) => {
    if (_floatingElement !== null) {
      setFloatingElement(_floatingElement)
    }
  }

  const initialConfig = {
    namespace: 'rifkidhan-editor',
    onError: (error: Error) => {
      throw error
    },
    nodes: [...EditorNode],
    theme: theme,
    editable,
    editorState: initialEditorState ? initialEditorState : undefined
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={s.root}>
        <ToolbarPlugin />
        <div className={s.divider} />
        <RichTextPlugin
          contentEditable={
            <div ref={floating} className="relative">
              <ContentEditable
                autoCorrect={false}
                spellCheck={false}
                className={s.editor}
              />
            </div>
          }
          placeholder={<div className={s.placeholder}>{placeholder}</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <CheckListPlugin />
        {floatingElement && <FloatingLinkEditor anchorElem={floatingElement} />}
        <ListPlugin />
        <AutoFocusPlugin />
        <HistoryPlugin />
        <AutoLinkPlugin />
        <CodeHighlightingPlugin />
        <HorizontalRulePlugin />
        <LinkPlugin />
        {onChange && <OnChangePlugin onChange={onChange} />}
      </div>
    </LexicalComposer>
  )
}

export default Editor
