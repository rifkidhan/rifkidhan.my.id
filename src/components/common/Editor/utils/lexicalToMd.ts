import type {
  ElementTransformer,
  TextMatchTransformer,
  TextFormatTransformer,
  Transformer
} from '@lexical/markdown'
import type { LexicalNode } from 'lexical'
import {
  CHECK_LIST,
  ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS
} from '@lexical/markdown'
import {
  $createHorizontalRuleNode,
  $isHorizontalRuleNode,
  HorizontalRuleNode
} from '../nodes/HorizontalRuleNodeCustom'
import { $createImageNode, $isImageNode, ImageNode } from '../nodes/ImageNode'

export const HR: ElementTransformer = {
  dependencies: [HorizontalRuleNode],
  export: (node: LexicalNode) => {
    return $isHorizontalRuleNode(node) ? '***' : null
  },
  regExp: /^(---|\*\*\*|___)\s?$/,
  replace: (parentNode, _1, _2, isImport) => {
    const line = $createHorizontalRuleNode()

    // TODO: Get rid of isImport flag
    if (isImport || parentNode.getNextSibling() != null) {
      parentNode.replace(line)
    } else {
      parentNode.insertBefore(line)
    }

    line.selectNext()
  },
  type: 'element'
}

export const IMAGE: TextMatchTransformer = {
  dependencies: [ImageNode],
  export: (node) => {
    if (!$isImageNode(node)) {
      return null
    }

    return `![${node.getAltText()}](${node.getSrc()} "${node.getAltText()}")`
  },
  importRegExp: /!(?:\[([^[]*)\])(?:\(([^(]+)\))/,
  regExp: /!(?:\[([^[]*)\])(?:\(([^(]+)\))$/,
  replace: (textNode, match) => {
    const [, altText, src, title] = match
    const imageNode = $createImageNode({
      altText,
      src,
      title
    })
    textNode.replace(imageNode)
  },
  trigger: ')',
  type: 'text-match'
}

export const SUBSCRIPT: TextFormatTransformer = {
  format: ['subscript'],
  tag: '~',
  type: 'text-format'
}

export const SUPERSCRIPT: TextFormatTransformer = {
  format: ['superscript'],
  tag: '^',
  type: 'text-format'
}

export const TRANSFORMERS: Transformer[] = [
  HR,
  IMAGE,
  CHECK_LIST,
  SUBSCRIPT,
  SUPERSCRIPT,
  ...ELEMENT_TRANSFORMERS,
  ...TEXT_FORMAT_TRANSFORMERS,
  ...TEXT_MATCH_TRANSFORMERS
]
