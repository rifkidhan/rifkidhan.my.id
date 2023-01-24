import prisma from '@libs/api/prisma'
import { unstable_getServerSession, type Session } from 'next-auth'
import { notFound } from 'next/navigation'

async function getUserData(session: Session | null) {
  if (!session) return undefined

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email
    }
  })

  return user
}

export default async function DashboardPage() {
  const session = await unstable_getServerSession()
  const userData = await getUserData(session)

  if (!userData) {
    notFound()
  }

  return (
    <>
      <h2>Profile</h2>
      <div className="grid grid-cols-4">
        <p>Name</p>
        <p className="col-span-3">: {userData.name}</p>
        <p>Email</p>
        <p className="col-span-3">: {userData.email}</p>
      </div>
    </>
  )
}
