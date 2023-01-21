import type { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import prisma from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture
        }
      }
    })
  ],

  session: {
    strategy: 'jwt'
  },

  pages: {
    signIn: '/signin'
  },

  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.username = token.username
        session.user.email = token.email
        session.user.name = token.name
        session.user.image = token.picture
      }

      return session
    },

    async jwt({ token, user }) {
      const isUser = await prisma.user.findFirst({
        where: {
          email: token.email
        }
      })

      if (!isUser) {
        token.id = user!.id

        return token
      }

      return {
        id: isUser.id,
        name: isUser.name,
        email: isUser.email,
        picture: isUser.image
      }
    }
  }
}
