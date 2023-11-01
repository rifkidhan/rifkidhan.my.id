import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(req: NextRequest): Promise<NextResponse> {
  const tag = req.nextUrl.searchParams.get('tag')
  const secret = req.nextUrl.searchParams.get('secret')

  if (!tag) {
    console.error('Missing tags')
    return NextResponse.json({ status: 200 })
  }

  if (!secret || secret !== process.env.REVALIDATE) {
    console.error('Invalid revalidated secret')
    return NextResponse.json({ status: 200 })
  }

  revalidateTag(tag)

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() })
}
