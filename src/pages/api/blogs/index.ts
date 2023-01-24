import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@libs/api/prisma'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '@libs/api/auth-options'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (session) {
    if (req.method === 'GET') {
      try {
        const id = req.query.id as string
        const data = await prisma.posts.findFirst({
          where: {
            id
          }
        })
        if (data) {
          return res.status(200).json(data)
        }
      } catch (e: any) {
        console.error(e)
        return res.status(400).json({ error: e.toString() })
      }
    }
    if (req.method === 'POST') {
      try {
        const body = JSON.parse(req.body)
        const date = new Date().toISOString()

        const post = await prisma.posts.create({
          data: {
            ...body,
            created_at: date,
            updated_at: date,
            author: {
              connect: {
                email: session.user.email
              }
            }
          }
        })
        if (post) {
          return res.status(200).json(post)
        }
      } catch (e: any) {
        console.error(e)
        return res.status(400).json({ error: e.toString() })
      }
    }
    if (req.method === 'PUT') {
      try {
        const id = req.query.id as string
        const body = JSON.parse(req.body)
        const date = new Date().toISOString()
        const data = await prisma.posts.update({
          where: {
            id
          },
          data: {
            ...body,
            updated_at: date
          }
        })
        if (data) {
          await res.revalidate(`/blogs/${data.slug}`)
          return res.status(200).json(data)
        }
      } catch (e: any) {
        console.error(e)
        return res.status(400).json({ error: e.toString() })
      }
    }
    if (req.method === 'DELETE') {
      try {
        const id = req.query.id as string
        const data = await prisma.posts.delete({
          where: {
            id
          }
        })
        if (data) {
          return res.status(200).json({ message: 'delete post success' })
        }
      } catch (e: any) {
        console.error(e)
        return res.status(400).json({ error: e.toString() })
      }
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } else {
    return res.status(401).send({ message: 'Unauthorized' })
  }
}
