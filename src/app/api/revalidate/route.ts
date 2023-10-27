import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  const path = req.nextUrl.searchParams.get('path')
  const secret = req.nextUrl.searchParams.get('secret')

  if (!path) {
    return Response.json({ message: 'Missing path param' }, { status: 400 })
  }

  if (secret !== process.env.REVALIDATE) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath(path)

  return Response.json({ revalidated: true, now: Date.now() })
}
