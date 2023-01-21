import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@libs/api/prisma'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '@libs/api/auth-options'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {
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
          // await res.revalidate('/blogs')
          return res.status(200).json(post)
        }
      } catch (e: any) {
        console.error(e)
        return res.status(400).json({ error: e.toString() })
      }
    } else {
      return res.status(401).send({ message: 'Unauthorized' })
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
