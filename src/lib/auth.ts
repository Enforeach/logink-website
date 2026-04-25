import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Nodemailer from 'next-auth/providers/nodemailer'
import Google from 'next-auth/providers/google'
import { prisma } from './prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM || 'hello@logink.id',
    }),
    ...(process.env.GOOGLE_CLIENT_ID
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
    verifyRequest: '/admin/verify',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email! },
          select: { id: true, role: true },
        })
        session.user.id = dbUser?.id ?? ''
        session.user.role = dbUser?.role ?? 'EDITOR'
      }
      return session
    },
  },
})
