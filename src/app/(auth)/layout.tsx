import { Logo } from '@components/ui'

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="fit container mx-auto flex flex-col items-center justify-center gap-5">
      <div>
        <Logo className="w-24 stroke-none md:w-36" />
      </div>
      {children}
    </main>
  )
}
