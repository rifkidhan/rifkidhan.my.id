import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalCommand,
  LexicalNode,
  SerializedLexicalNode
} from 'lexical'

import { $applyNodeReplacement, createCommand, DecoratorNode } from 'lexical'

export type SerializedHorizontalRuleNode = SerializedLexicalNode & {
  type: 'horizontalrule'
  version: 1
}

export const INSERT_HORIZONTAL_RULE_COMMAND: LexicalCommand<void> =
  createCommand('INSERT_HORIZONTAL_RULE_COMMAND')

export class HorizontalRuleNode extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return 'horizontalrule'
  }

  static clone(node: HorizontalRuleNode): HorizontalRuleNode {
    return new HorizontalRuleNode(node.__key)
  }

  static importJSON(
    serializedNode: SerializedHorizontalRuleNode
  ): HorizontalRuleNode {
    return $createHorizontalRuleNode()
  }

  static importDOM(): DOMConversionMap | null {
    return {
      hr: () => ({
        conversion: convertHorizontalRuleElement,
        priority: 0
      })
    }
  }

  exportJSON(): SerializedLexicalNode {
    return {
      type: 'horizontalrule',
      version: 1
    }
  }

  exportDOM(): DOMExportOutput {
    return { element: document.createElement('hr') }
  }

  createDOM(): HTMLElement {
    return document.createElement('hr')
  }

  getTextContent(): '\n' {
    return '\n'
  }

  isInline(): false {
    return false
  }

  updateDOM(): false {
    return false
  }

  decorate(): JSX.Element {
    return <hr />
  }
}

function convertHorizontalRuleElement(): DOMConversionOutput {
  return { node: $createHorizontalRuleNode() }
}

export function $createHorizontalRuleNode(): HorizontalRuleNode {
  return $applyNodeReplacement(new HorizontalRuleNode())
}

export function $isHorizontalRuleNode(
  node: LexicalNode | null | undefined
): node is HorizontalRuleNode {
  return node instanceof HorizontalRuleNode
}
