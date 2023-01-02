import type { NextApiRequest, NextApiResponse } from 'next'
import { s3, getList } from '@libs/api/s3Client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bucket = process.env.STORJ_BUCKET as string

  if (req.method === 'POST') {
    const file = req.query.file as string
    const fileType = req.query.fileType as string

    const expires = new Date()
    expires.setSeconds(60)
    const policy = s3.newPostPolicy()
    policy.setBucket(bucket)
    policy.setKey(file)
    policy.setContentLengthRange(1024, 1024 * 1024)
    policy.setContentType(fileType)
    policy.setExpires(expires)

    const sendFile = await s3.presignedPostPolicy(policy)

    try {
      return res.status(200).json(sendFile)
    } catch (e: any) {
      return res.status(500).json({ error: e.toString() })
    }
  }
  if (req.method === 'GET') {
    const prefix = req.query.prefix as string

    if (prefix) {
      const listObject = await getList(bucket, prefix)
      try {
        return res.status(200).json(listObject)
      } catch (e: any) {
        return res.status(401).json({ error: e.toString() })
      }
    }

    const listObject = await getList(bucket, '')
    try {
      return res.status(200).json(listObject)
    } catch (e: any) {
      return res.status(401).json({ error: e.toString() })
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
