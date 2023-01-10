import type { Klass, LexicalNode } from 'lexical'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode'

export const EditorNode: Array<Klass<LexicalNode>> = [
  AutoLinkNode,
  LinkNode,
  ListItemNode,
  ListNode,
  HeadingNode,
  QuoteNode,
  CodeHighlightNode,
  CodeNode,
  HorizontalRuleNode
]
