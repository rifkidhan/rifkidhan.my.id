'use client'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $wrapNodeInElement, mergeRegister } from '@lexical/utils'
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR
} from 'lexical'
import { ChangeEvent, useEffect, useState } from 'react'
import {
  $createImageNode,
  $isImageNode,
  ImageNode,
  INSERT_IMAGE_COMMAND,
  InsertImagePayload
} from '../../nodes/ImageNode'
import { Button, Input, Field, Dropzone, Spinner } from '@components/ui'
import { imageUrl } from '@libs/constants'
import s from './ImagePlugin.module.css'

const InsertImageUrlDialog = ({
  onClick
}: {
  onClick: (payload: InsertImagePayload) => void
}) => {
  const [src, setSrc] = useState('')
  const [altText, setAltText] = useState('')
  const [title, setTitle] = useState('')

  return (
    <div className={s.url}>
      <Field htmlFor="image-src" label="URL Image">
        <Input
          type="text"
          name="image-src"
          id="image-src"
          placeholder="Add url image"
          required
          value={src}
          onChange={(e) => setSrc(e.target.value)}
        />
      </Field>
      <Field htmlFor="image-alt" label="Alt Image">
        <Input
          type="text"
          name="image-alt"
          id="image-alt"
          placeholder="Add alt image"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
        />
      </Field>
      <Field htmlFor="image-title" label="Title Image">
        <Input
          type="text"
          name="image-title"
          id="image-title"
          placeholder="Add title image"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field>
      <Button
        type="button"
        disabled={!src || !altText}
        onClick={() => onClick({ src, altText, title })}
      >
        Confirm
      </Button>
    </div>
  )
}

const InsertImageUploadDialog = ({
  onClick
}: {
  onClick: (payload: InsertImagePayload) => void
}) => {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [fileExt, setFileExt] = useState('')
  const [altText, setAltText] = useState('')
  const [title, setTitle] = useState('')

  const prepareUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const allFiles = e.target.files
    if (allFiles) {
      const file = allFiles[0]
      setFile(file)
      setFileName(encodeURIComponent(file.name))
      setFileExt(encodeURIComponent(file.type))
    }
  }

  const onUpload = async () => {
    if (!file) return

    const res = await fetch(
      `/api/files?file=blog/${fileName}&fileType=${fileExt}`,
      {
        method: 'POST'
      }
    )

    const { postURL, formData } = await res.json()

    const data = new FormData()

    Object.entries({ ...formData, file }).forEach(([key, value]) => {
      data.append(key, value as string)
    })

    const upload = await fetch(postURL, {
      method: 'POST',
      body: data
    })

    if (upload.ok) {
      console.log('Upload successfully')
      const src = imageUrl + '/blog/' + fileName
      onClick({ src, altText, title })
    } else {
      console.error('Upload failed.')
    }
  }

  return (
    <div className={s.galleryWraper}>
      <div>
        <Field htmlFor="image-src" label="URL Image">
          <Dropzone
            name="image-src"
            id="image-src"
            required
            onChange={prepareUpload}
          />
        </Field>
        <Field htmlFor="image-alt" label="Alt Image">
          <Input
            type="text"
            name="image-alt"
            id="image-alt"
            placeholder="Add alt image"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
        </Field>
        <Field htmlFor="image-title" label="Title Image">
          <Input
            type="text"
            name="image-title"
            id="image-title"
            placeholder="Add title image"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>
        <Button
          type="button"
          disabled={fileName === '' || !altText}
          onClick={onUpload}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

export const ImagePluginModal = ({ onClose }: { onClose: () => void }) => {
  const [editor] = useLexicalComposerContext()
  const [mode, setMode] = useState<null | 'url' | 'upload'>(null)

  const onClick = (payload: InsertImagePayload) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, payload)
    onClose()
  }

  return (
    <>
      {!mode && (
        <div>
          <Button type="button" onClick={() => setMode('url')}>
            From Url
          </Button>
          <Button type="button" onClick={() => setMode('upload')}>
            Upload
          </Button>
        </div>
      )}
      {mode === 'upload' && <InsertImageUploadDialog onClick={onClick} />}
      {mode === 'url' && <InsertImageUrlDialog onClick={onClick} />}
    </>
  )
}

export default function ImagePlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor')
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload)
          $insertNodes([imageNode])
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd()
          }

          return true
        },
        COMMAND_PRIORITY_EDITOR
      )
    )
  }, [editor])

  return null
}
