import { TRANSFORMERS } from './utils/lexicalToMd'
import { createHeadlessEditor } from '@lexical/headless'
import { $convertToMarkdownString } from '@lexical/markdown'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { ListItemNode, ListNode } from '@lexical/list'
import { LinkNode, AutoLinkNode } from '@lexical/link'
import { CodeNode, CodeHighlightNode } from '@lexical/code'
import { HorizontalRuleNode } from './nodes/HorizontalRuleNodeCustom'
import { ImageNode } from './nodes/ImageNode'

export default function lexicalParser(input: string) {
  let output = ''

  const editor = createHeadlessEditor({
    nodes: [
      HorizontalRuleNode,
      HeadingNode,
      QuoteNode,
      ListItemNode,
      ListNode,
      LinkNode,
      AutoLinkNode,
      CodeHighlightNode,
      CodeNode,
      ImageNode
    ]
  })

  editor.setEditorState(editor.parseEditorState(input))

  editor.update(() => {
    output = $convertToMarkdownString(TRANSFORMERS)

    return output
  })

  return output
}
