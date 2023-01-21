'use client'

import type { LexicalEditor, NodeKey } from 'lexical'
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND
} from 'lexical'
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection'
import { mergeRegister } from '@lexical/utils'
import { useCallback, useEffect, useRef } from 'react'
import { $isImageNode } from './ImageNode'
import Image from 'next/image'
import { blurDataUrl } from '@libs/constants'
import s from './ImageComponent.module.css'

interface ImageComponentProps {
  src: string
  alt: string
  nodeKey: NodeKey
  width?: number
  height?: number
  editor: LexicalEditor
  title?: string
}

export default function ImageComponent(props: ImageComponentProps) {
  const { src, alt, nodeKey, width, height, title, editor } = props
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)

  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event: KeyboardEvent = payload
        event.preventDefault()
        const node = $getNodeByKey(nodeKey)
        if ($isImageNode(node)) {
          node.remove()
        }
        setSelected(false)
      }
      return false
    },
    [isSelected, nodeKey, setSelected]
  )

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CLICK_COMMAND,
        (payload) => {
          const event = payload

          if (event.target === imageRef.current) {
            if (event.shiftKey) {
              setSelected(!isSelected)
            } else {
              clearSelection()
              setSelected(true)
            }
            return true
          }

          return false
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      )
    )
  }, [editor, isSelected, clearSelection, onDelete, setSelected])

  return height && width ? (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      title={title}
      ref={imageRef}
      placeholder="blur"
      blurDataURL={blurDataUrl}
      style={{ height: 'auto' }}
    />
  ) : (
    <div className={s.imageWrapper}>
      <Image
        src={src}
        alt={alt}
        title={title}
        ref={imageRef}
        fill
        className={s.imageItem}
        placeholder="blur"
        blurDataURL={blurDataUrl}
      />
    </div>
  )
}
