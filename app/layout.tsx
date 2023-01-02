import '@styles/globals.css'
import { Epilogue } from '@next/font/google'
import { Footer, Header } from '@components/common'
import Provider from './Provider'
import ClientsComponent from './Clients'

const epilogue = Epilogue({
  variable: '--epilogue',
  weight: 'variable',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  fallback: ['Arial', 'system-ui']
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={epilogue.variable}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Provider>
          <Header />
          {children}
          <ClientsComponent />
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
