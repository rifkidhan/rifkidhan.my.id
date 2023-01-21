import { useCallback, useEffect, useRef, useState, Dispatch } from 'react'
import { createPortal } from 'react-dom'
import {
  $isAutoLinkNode,
  $isLinkNode,
  TOGGLE_LINK_COMMAND
} from '@lexical/link'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $findMatchingParent, mergeRegister } from '@lexical/utils'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  GridSelection,
  KEY_ESCAPE_COMMAND,
  LexicalEditor,
  NodeSelection,
  RangeSelection,
  SELECTION_CHANGE_COMMAND
} from 'lexical'
import type { VirtualElement } from '@floating-ui/react'
import { computePosition, autoPlacement } from '@floating-ui/react'
import { sanitizeUrl } from '@components/common/Editor/utils/url'
import getSelectedNode from '@components/common/Editor/utils/getSelectedNode'
import { Button, Input } from '@components/ui'
import { Edit } from 'lucide-react'
import s from './FloatingLinkEditorPlugin.module.css'

interface FloatingEditorProps {
  editor: LexicalEditor
  anchorElem: HTMLElement
  isLink: boolean
  setIsLink: Dispatch<boolean>
}

const FloatingLinkEditor = ({
  editor,
  anchorElem,
  isLink,
  setIsLink
}: FloatingEditorProps): JSX.Element | null => {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [linkUrl, setLinkUrl] = useState('')
  const [isEditMode, setEditMode] = useState(false)
  const [lastSelection, setLastSelection] = useState<
    RangeSelection | GridSelection | NodeSelection | null
  >(null)

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL())
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL())
      } else {
        setLinkUrl('')
      }
    }
    const editorElem = editorRef.current
    const nativeSelection = window.getSelection()
    const activeElement = document.activeElement

    if (!editorElem) {
      return
    }

    const rootElement = editor.getRootElement()

    if (
      selection !== null &&
      nativeSelection !== null &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode) &&
      editor.isEditable()
    ) {
      const domRange = nativeSelection.getRangeAt(0)
      let rect: DOMRect
      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild as HTMLElement
        }
        rect = inner.getBoundingClientRect()
      } else {
        rect = domRange.getBoundingClientRect()
      }

      let virtualElement: VirtualElement = {
        getBoundingClientRect() {
          return {
            width: rect.width,
            height: rect.height,
            x: rect.x,
            y: rect.y,
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom
          }
        }
      }

      computePosition(virtualElement, editorElem, {
        middleware: [autoPlacement()]
      }).then(({ x, y }) => {
        editorElem.style.top = `${y}px`
        editorElem.style.left = `${x}px`
      })

      // setFloatingElemPosition(rect, editorElem, anchorElem);
      setLastSelection(selection)
    } else if (!activeElement) {
      if (rootElement !== null) {
        // setFloatingElemPosition(null, editorElem, anchorElem);
      }
      setLastSelection(null)
      setEditMode(false)
      setLinkUrl('')
    }

    return true
  }, [editor])

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement

    const update = () => {
      editor.getEditorState().read(() => {
        updateLinkEditor()
      })
    }

    window.addEventListener('resize', update)

    if (scrollerElem) {
      scrollerElem.addEventListener('scroll', update)
    }

    return () => {
      window.removeEventListener('resize', update)

      if (scrollerElem) {
        scrollerElem.removeEventListener('scroll', update)
      }
    }
  }, [anchorElem.parentElement, editor, updateLinkEditor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor()
        })
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor()
          return true
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        () => {
          if (isLink) {
            setIsLink(false)
            return true
          }
          return false
        },
        COMMAND_PRIORITY_HIGH
      )
    )
  }, [editor, updateLinkEditor, setIsLink, isLink])

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor()
    })
  }, [editor, updateLinkEditor])

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditMode])

  return (
    <div ref={editorRef} className={s.root}>
      {isEditMode ? (
        <div className={s.wrapper}>
          <Input
            ref={inputRef}
            value={linkUrl}
            onChange={(event) => {
              setLinkUrl(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === 'Escape') {
                event.preventDefault()
                if (lastSelection !== null) {
                  if (linkUrl !== '') {
                    editor.dispatchCommand(
                      TOGGLE_LINK_COMMAND,
                      sanitizeUrl(linkUrl)
                    )
                  }
                  setEditMode(false)
                }
              }
            }}
          />
        </div>
      ) : (
        <>
          <div className={s.wrapper}>
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={s.link}
            >
              {linkUrl}
            </a>
            <Button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setEditMode(true)
              }}
              icons={<Edit size={20} />}
            />
          </div>
        </>
      )}
    </div>
  )
}

const useFloatingEditor = (
  editor: LexicalEditor,
  anchorElem: HTMLElement
): JSX.Element | null => {
  const [activeEditor, setActiveEditor] = useState(editor)
  const [isLink, setIsLink] = useState(false)

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const linkParent = $findMatchingParent(node, $isLinkNode)
      const autoLinkParent = $findMatchingParent(node, $isAutoLinkNode)

      // We don't want this menu to open for auto links.
      if (linkParent != null && autoLinkParent == null) {
        setIsLink(true)
      } else {
        setIsLink(false)
      }
    }
  }, [])

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar()
        setActiveEditor(newEditor)
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [editor, updateToolbar])

  return isLink
    ? createPortal(
        <FloatingLinkEditor
          editor={activeEditor}
          isLink={isLink}
          anchorElem={anchorElem}
          setIsLink={setIsLink}
        />,
        anchorElem
      )
    : null
}

const FloatingLinkEditorPlugin = ({
  anchorElem = document.body
}: {
  anchorElem?: HTMLElement
}): JSX.Element | null => {
  const [editor] = useLexicalComposerContext()
  return useFloatingEditor(editor, anchorElem)
}

export default FloatingLinkEditorPlugin
