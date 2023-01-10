import { LexicalEditor, NodeKey } from 'lexical'
import { useCallback, useEffect, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  DEPRECATED_$isGridSelection,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND
} from 'lexical'
import {
  $createCodeNode,
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName
} from '@lexical/code'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND
} from '@lexical/list'
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  HeadingTagType
} from '@lexical/rich-text'
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode'
import { $setBlocksType_experimental } from '@lexical/selection'
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister
} from '@lexical/utils'
import getSelectedNode from '../utils/getSelectedNode'
import { sanitizeUrl } from '../utils/url'
import { Button, Dropdown, DropdownItem } from '@components/ui'
import Toolbaricons from './Toolbaricons'
import s from '../Editor.module.css'

const blockTypeToBlockName = {
  bullet: 'Bulleted List',
  check: 'Check List',
  code: 'Code Block',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  number: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote'
}

const getCodeLanguageOptions = (): [string, string][] => {
  const options: [string, string][] = []

  for (const [lang, friendlyName] of Object.entries(
    CODE_LANGUAGE_FRIENDLY_NAME_MAP
  )) {
    options.push([lang, friendlyName])
  }

  return options
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions()

const BlockFormat = ({
  editor,
  blockType,
  disabled = false
}: {
  blockType: keyof typeof blockTypeToBlockName
  editor: LexicalEditor
  disabled?: boolean
}): JSX.Element => {
  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection()
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        )
          $setBlocksType_experimental(selection, () => $createParagraphNode())
      })
    }
  }

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection()
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $setBlocksType_experimental(selection, () =>
            $createHeadingNode(headingSize)
          )
        }
      })
    }
  }

  const formatBulletList = () => {
    if (blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatCheckList = () => {
    if (blockType !== 'check') {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatNumberList = () => {
    if (blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection()
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $setBlocksType_experimental(selection, () => $createQuoteNode())
        }
      })
    }
  }

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        let selection = $getSelection()

        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          if (selection.isCollapsed()) {
            $setBlocksType_experimental(selection, () => $createCodeNode())
          } else {
            const textContent = selection.getTextContent()
            const codeNode = $createCodeNode()
            selection.insertNodes([codeNode])
            selection = $getSelection()
            if ($isRangeSelection(selection))
              selection.insertRawText(textContent)
          }
        }
      })
    }
  }
  const blockItems = [
    {
      id: 'paragraph',
      name: 'Paragraph Format',
      command: () => formatParagraph(),
      active: blockType === 'paragraph'
    },
    {
      id: 'h2',
      name: 'Heading 2 Format',
      command: () => formatHeading('h2'),
      active: blockType === 'h2'
    },
    {
      id: 'h3',
      name: 'Heading 3 Format',
      command: () => formatHeading('h3'),
      active: blockType === 'h3'
    },
    {
      id: 'h4',
      name: 'Heading 4 Format',
      command: () => formatHeading('h4'),
      active: blockType === 'h4'
    },
    {
      id: 'h5',
      name: 'Heading 5 Format',
      command: () => formatHeading('h5'),
      active: blockType === 'h5'
    },
    {
      id: 'h6',
      name: 'Heading 6 Format',
      command: () => formatHeading('h6'),
      active: blockType === 'h6'
    },
    {
      id: 'number',
      name: 'Order List Format',
      command: () => formatNumberList(),
      active: blockType === 'number'
    },
    {
      id: 'bullet',
      name: 'Unorder List Format',
      command: () => formatBulletList(),
      active: blockType === 'bullet'
    },
    {
      id: 'check',
      name: 'Check List Format',
      command: () => formatCheckList(),
      active: blockType === 'check'
    },
    {
      id: 'quote',
      name: 'Quote Format',
      command: () => formatQuote(),
      active: blockType === 'quote'
    },
    {
      id: 'codeBlock',
      name: 'Code Block Format',
      command: () => formatCode(),
      active: blockType === 'code'
    },
    {
      id: 'separator',
      name: 'Add Separator',
      command: () =>
        editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)
    }
    // {
    // 	id: 'image',
    // 	name: 'Add Image',
    // 	command: () => {
    // 		activeModal.set('image-plugin-lexical');
    // 	}
    // }
  ]

  return (
    <>
      {blockItems.map((item) => (
        <Button
          key={item.id}
          type="button"
          variant="circle"
          active={item.active}
          title={item.name}
          disabled={disabled}
          onClick={item.command}
          aria-label={item.name}
          className={item.active ? s.buttonActive : ''}
        >
          <Toolbaricons name={item.id} />
        </Button>
      ))}
    </>
  )
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>('paragraph')
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
    null
  )
  const [isLink, setIsLink] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isSubscript, setIsSubscript] = useState(false)
  const [isSuperscript, setIsSuperscript] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [codeLanguage, setCodeLanguage] = useState<string>('')
  const [isEditable, setIsEditable] = useState(() => editor.isEditable())

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent()

              return parent !== null && $isRootOrShadowRoot(parent)
            })

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow()
      }

      const elementKey = element.getKey()
      const elementDom = activeEditor.getElementByKey(elementKey)

      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsUnderline(selection.hasFormat('underline'))
      setIsStrikethrough(selection.hasFormat('strikethrough'))
      setIsSubscript(selection.hasFormat('subscript'))
      setIsSuperscript(selection.hasFormat('superscript'))
      setIsCode(selection.hasFormat('code'))

      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true)
      } else {
        setIsLink(false)
      }

      if (elementDom !== null) {
        setSelectedElementKey(elementKey)
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          )
          const type = parentList
            ? parentList.getListType()
            : element.getListType()
          setBlockType(type)
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType()
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName)
          }
          if ($isCodeNode(element)) {
            const language =
              element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP
            setCodeLanguage(
              language ? CODE_LANGUAGE_MAP[language] || language : ''
            )
            return
          }
        }
      }
    }
  }, [activeEditor])

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

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable)
      }),
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      )
    )
  }, [activeEditor, editor, updateToolbar])

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'))
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [editor, isLink])

  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey)
          if ($isCodeNode(node)) {
            node.setLanguage(value)
          }
        }
      })
    },
    [activeEditor, selectedElementKey]
  )

  const essentialItems = [
    {
      id: 'undo',
      name: 'Undo Command',
      command: () => editor.dispatchCommand(UNDO_COMMAND, undefined),
      disabled: canUndo
    },
    {
      id: 'redo',
      name: 'Redo Command',
      command: () => editor.dispatchCommand(REDO_COMMAND, undefined),
      disabled: canRedo
    }
  ]

  const inlineItems = [
    {
      id: 'bold',
      name: 'Bold Format',
      command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold'),
      active: isBold
    },
    {
      id: 'italic',
      name: 'Italic Format',
      command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic'),
      active: isItalic
    },
    {
      id: 'underline',
      name: 'Underline Format',
      command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline'),
      active: isUnderline
    },
    {
      id: 'strike',
      name: 'Strikethrough Format',
      command: () =>
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough'),
      active: isStrikethrough
    },
    {
      id: 'subscript',
      name: 'Subscript Format',
      command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript'),
      active: isSubscript
    },
    {
      id: 'superscript',
      name: 'Superscript Format',
      command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript'),
      active: isSuperscript
    },
    {
      id: 'link',
      name: 'Link Format',
      command: () => insertLink(),
      active: isLink
    },
    {
      id: 'codeInline',
      name: 'Code Format',
      command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code'),
      active: isCode
    }
  ]

  return (
    <div className={s.toolbar}>
      {essentialItems.map((item) => (
        <Button
          key={item.id}
          type="button"
          variant="circle"
          title={item.name}
          disabled={!isEditable || !item.disabled}
          onClick={item.command}
          aria-label={item.name}
        >
          <Toolbaricons name={item.id} />
        </Button>
      ))}
      <div className={s.separator} />
      {blockType === 'code' ? (
        <Dropdown
          disabled={!isEditable}
          label={getLanguageFriendlyName(codeLanguage)}
          aria-label="Select Language"
        >
          {CODE_LANGUAGE_OPTIONS.map(([value, name]) => (
            <DropdownItem
              key={value}
              onClick={() => onCodeLanguageSelect(value)}
              title={name}
            >
              {name}
            </DropdownItem>
          ))}
          <div />
        </Dropdown>
      ) : (
        <BlockFormat
          disabled={!isEditable}
          editor={editor}
          blockType={blockType}
        />
      )}

      <div className={s.separator} />
      {inlineItems.map((item) => (
        <Button
          key={item.id}
          type="button"
          variant="circle"
          active={item.active}
          title={item.name}
          disabled={!isEditable}
          onClick={item.command}
          aria-label={item.name}
          className={item.active ? s.buttonActive : ''}
        >
          <Toolbaricons name={item.id} />
        </Button>
      ))}
    </div>
  )
}
