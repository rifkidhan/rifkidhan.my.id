import Form from './Form'
import { redirect } from 'next/navigation'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '@libs/api/auth-options'

export default async function CreatePostPage() {
  const session = await unstable_getServerSession(authOptions)

  if (!session) {
    redirect('/signin')
  }

  return (
    <main className="container mx-auto my-10 flex flex-col gap-5">
      <h1>Bikin Post Kamu</h1>
      <Form />
    </main>
  )
}
