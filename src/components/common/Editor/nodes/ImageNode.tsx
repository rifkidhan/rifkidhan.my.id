import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
  LexicalCommand
} from 'lexical'

import { $applyNodeReplacement, DecoratorNode, createCommand } from 'lexical'
import ImageComponent from './ImageComponent'

export interface ImagePayload {
  altText: string
  height?: number
  width?: number
  key?: NodeKey
  src: string
  title?: string
}

export type InsertImagePayload = Readonly<ImagePayload>

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand('INSERT_IMAGE_COMMAND')

function convertImageElement(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLImageElement) {
    const { alt: altText, src, width, height } = domNode
    const node = $createImageNode({ altText, height, src, width })
    return { node }
  }
  return null
}

export type SerializedImageNode = Spread<
  {
    altText: string
    height?: number
    src: string
    width?: number
    title?: string
    type: 'image'
    version: 1
  },
  SerializedLexicalNode
>

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string
  __altText: string
  __width: number | undefined
  __height: number | undefined
  __title: string | undefined

  static getType(): string {
    return 'image'
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__width,
      node.__height,
      node.__key,
      node.__title
    )
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { altText, height, width, src, title } = serializedNode
    const node = $createImageNode({
      altText,
      height,
      src,
      width,
      title
    })

    return node
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('img')
    element.setAttribute('src', this.__src)
    element.setAttribute('alt', this.__altText)
    if (this.__height && this.__width) {
      element.setAttribute('width', this.__width.toString())
      element.setAttribute('height', this.__height.toString())
    }
    if (this.__title) {
      element.setAttribute('title', this.__title)
    }
    return { element }
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (node: Node) => ({
        conversion: convertImageElement,
        priority: 0
      })
    }
  }

  constructor(
    src: string,
    altText: string,
    width?: number,
    height?: number,
    key?: NodeKey,
    title?: string
  ) {
    super(key)
    this.__src = src
    this.__altText = altText
    this.__width = width
    this.__height = height
    this.__title = title
  }

  exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      height: this.__height,
      src: this.getSrc(),
      title: this.getTitleText(),
      type: 'image',
      version: 1,
      width: this.__width
    }
  }

  setWidthAndHeight(width: number, height: number): void {
    const writable = this.getWritable()
    writable.__width = width
    writable.__height = height
  }

  createDOM(config: EditorConfig): HTMLElement {
    const wrap = document.createElement('div')
    const theme = config.theme
    const className = theme.image
    if (className !== undefined) {
      wrap.className = className
    }
    return wrap
  }

  updateDOM(): false {
    return false
  }

  getSrc(): string {
    return this.__src
  }

  getAltText(): string {
    return this.__altText
  }

  getTitleText(): string | undefined {
    return this.__title
  }

  decorate(editor: LexicalEditor): JSX.Element {
    return (
      <ImageComponent
        editor={editor}
        nodeKey={this.__key}
        src={this.__src}
        alt={this.__altText}
        height={this.__height}
        width={this.__width}
      />
    )
  }
}

export function $createImageNode({
  altText,
  height,
  src,
  width,
  key
}: ImagePayload): ImageNode {
  return $applyNodeReplacement(new ImageNode(src, altText, width, height, key))
}

export function $isImageNode(
  node: LexicalNode | null | undefined
): node is ImageNode {
  return node instanceof ImageNode
}
