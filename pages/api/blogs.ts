import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@libs/api/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const body = JSON.parse(req.body)

      const post = await prisma.posts.create({
        data: body
      })
      if (post) {
        res.revalidate('/blogs')
        return res.status(200).json(post)
      }
    } catch (e: any) {
      console.error(e)
      return res.status(400).json({ error: e.toString() })
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
