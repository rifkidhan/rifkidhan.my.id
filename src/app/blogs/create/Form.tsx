'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
// import { Editor } from '@components/common'
import { useRouter } from 'next/navigation'
import { Button, Input, Field, Toggle, Dropzone } from '@components/ui'
import { Edit3 } from 'lucide-react'
import slugify from '@libs/slugify'

const Editor = dynamic(() =>
  import('@components/common/Editor').then((mod) => mod.Editor)
)

export default function CreatePost() {
  const [content, setContent] = useState<{
    title: string
    description: string
    slug?: string
    post: string
    meta_title?: string
    meta_description?: string
    published: boolean
  }>({
    title: '',
    description: '',
    post: '',
    published: false
  })
  const [file, setFile] = useState<File | null>(null)
  const [previewFile, setPreviewFile] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const uploadPreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!
    setFile(file)
    setPreviewFile(URL.createObjectURL(file))
  }

  const uploadImage = async (fileName?: string, fileExt?: string) => {
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
      console.log('Uploaded successfully!')
    } else {
      console.error('Upload failed.')
    }
  }

  const uploadPost = async (e: FormEvent) => {
    e.preventDefault()

    setLoading(true)
    let fileExt: string | undefined
    let thumbnailName: string | undefined

    const slug =
      content.slug !== undefined ? content.title : slugify(content.title)

    if (file) {
      fileExt = file.name.split('.').pop()
      thumbnailName = `${slug}-${Math.random()}.${fileExt}`
      await uploadImage(thumbnailName, fileExt)
    }

    const post = {
      title: content.title,
      description: content.description,
      slug: slug,
      content: content.post,
      published: content.published,
      thumbnail: thumbnailName ? thumbnailName : undefined,
      meta_title:
        content.meta_title !== undefined ? content.meta_title : content.title,
      meta_description:
        content.meta_description !== undefined
          ? content.meta_description
          : content.description
    }

    const data = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify(post)
    })

    if (data) {
      console.log('Success posting a post')
    } else {
      console.error('something wrong')
    }

    setLoading(false)
    router.push('/blogs')
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={uploadPost}>
      <Field label="Judul" htmlFor="title">
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="tambahkan judul disini"
          icons={<Edit3 />}
          required
          value={content.title}
          onChange={(e) => setContent({ ...content, title: e.target.value })}
        />
      </Field>

      <Field label="Deskripsi" htmlFor="description">
        <Input
          type="text"
          name="description"
          id="description"
          placeholder="tambahkan deskripsi disini"
          icons={<Edit3 />}
          required
          value={content.description}
          onChange={(e) =>
            setContent({ ...content, description: e.target.value })
          }
        />
      </Field>

      <Field label="Slug" htmlFor="slug">
        <Input
          type="text"
          name="slug"
          id="slug"
          placeholder="tambahkan slug kamu"
          icons={<Edit3 />}
          value={content.slug}
          onChange={(e) =>
            setContent({ ...content, slug: slugify(e.target.value) })
          }
        />
      </Field>

      <Field label="Thumbnail" htmlFor="thumbnail">
        <Dropzone
          name="thumbnail"
          id="thumbnail"
          accept="image/*"
          onChange={uploadPreview}
        />
      </Field>

      {/* {previewFile && (
        <Image
          src={previewFile}
          alt="preview image"
          sizes="100vw"
          width={500}
          height={500}
          className="h-auto w-auto"
        />
      )} */}

      <Field label="Konten Post" htmlFor="content">
        <Editor
          onChange={(s) => {
            setContent({ ...content, post: JSON.stringify(s.toJSON()) })
          }}
        />
        {/* <RichText
          name="content"
          id="content"
          value={content.post}
          placeholder="tambahkan konten kamu"
          required
          onChange={(e) => setContent({ ...content, post: e.target.value })}
        /> */}
      </Field>

      <Field label="Meta Title" htmlFor="meta_title">
        <Input
          type="text"
          name="meta_title"
          id="meta_title"
          placeholder="tambahkan meta judul disini"
          icons={<Edit3 />}
          value={content.meta_title}
          onChange={(e) =>
            setContent({
              ...content,
              meta_title: e.target.value
            })
          }
        />
      </Field>

      <Field label="Meta Description" htmlFor="meta_description">
        <Input
          type="text"
          name="meta_description"
          id="meta_description"
          placeholder="tambahkan meta deskripsi disini"
          icons={<Edit3 />}
          value={content.meta_description}
          onChange={(e) =>
            setContent({
              ...content,
              meta_description: e.target.value
            })
          }
        />
      </Field>

      <Toggle
        size="md"
        checked={content.published}
        label="published"
        onClick={() =>
          setContent({ ...content, published: !content.published })
        }
      />

      <Button type="submit" loading={loading}>
        Submit
      </Button>
    </form>
  )
}
