'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { Button, Modal } from '@components/ui'
import { Trash } from 'lucide-react'

const DeletePost = ({
  title,
  thumbnail,
  id
}: {
  title: string
  thumbnail?: string
  id: string
}) => {
  const router = useRouter()
  const [openModal, setOpenModal] = useState(false)
  const [isPending, startTransition] = useTransition()

  const deletePost = async () => {
    if (thumbnail) {
      await fetch(`/api/files?file=${thumbnail}`, {
        method: 'DELETE'
      })
    }
    const post = await fetch(`/api/blogs?id=${id}`, {
      method: 'DELETE'
    })

    if (post.ok) {
      startTransition(() => {
        router.refresh()
      })
    }
  }
  return (
    <>
      <Button
        type="button"
        icons={<Trash />}
        variant="circle"
        className="bg-red"
        title="Delete Blog"
        onClick={() => setOpenModal(true)}
        disabled={isPending}
      />
      {openModal &&
        createPortal(
          <Modal onClose={() => setOpenModal(false)} title="Delete Post">
            <div className="inline-flex flex-col gap-2">
              <p className="h5">Are you sure delete {title} post?</p>
              <span className="inline-flex flex-row gap-3">
                <Button
                  type="button"
                  variant="color"
                  className="w-full bg-green"
                  onClick={() => setOpenModal(false)}
                  disabled={isPending}
                >
                  No
                </Button>
                <Button
                  type="button"
                  variant="color"
                  className="w-full bg-red"
                  onClick={deletePost}
                  disabled={isPending}
                >
                  {`Yes, I'm sure.`}
                </Button>
              </span>
            </div>
          </Modal>,
          document.body
        )}
    </>
  )
}

export default DeletePost
