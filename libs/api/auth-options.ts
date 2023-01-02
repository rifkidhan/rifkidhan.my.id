import type { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
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

  // session: {
  //   strategy: 'jwt',
  //   maxAge: 60 * 60 * 24 * 30
  // },

  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/new-user'
  },

  callbacks: {
    async session({ session, user }) {
      session.user.username = user.username

      return session
    }
  }
}
