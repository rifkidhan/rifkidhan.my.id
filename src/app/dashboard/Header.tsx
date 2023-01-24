import { unstable_getServerSession } from 'next-auth'

export default async function HeaderDashboard() {
  const session = await unstable_getServerSession()

  return <>Welcome {session?.user.name}</>
}
