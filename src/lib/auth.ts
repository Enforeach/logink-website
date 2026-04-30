import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Resend from 'next-auth/providers/resend'
import Google from 'next-auth/providers/google'
import { prisma } from './prisma'

const baseAdapter = PrismaAdapter(prisma)
const debugAdapter = {
  ...baseAdapter,
  createVerificationToken: async (data: Parameters<NonNullable<typeof baseAdapter.createVerificationToken>>[0]) => {
    console.log('[auth] createVerificationToken called:', { identifier: data.identifier, expires: data.expires })
    try {
      const result = await baseAdapter.createVerificationToken!(data)
      console.log('[auth] createVerificationToken success')
      return result
    } catch (e) {
      console.error('[auth] createVerificationToken error:', e)
      throw e
    }
  },
  useVerificationToken: async (data: Parameters<NonNullable<typeof baseAdapter.useVerificationToken>>[0]) => {
    console.log('[auth] useVerificationToken called:', { identifier: data.identifier })
    try {
      const result = await baseAdapter.useVerificationToken!(data)
      console.log('[auth] useVerificationToken result:', result ? 'found' : 'null')
      return result
    } catch (e) {
      console.error('[auth] useVerificationToken error:', e)
      throw e
    }
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: debugAdapter,
  session: { strategy: 'jwt' },
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
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
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: { id: true, role: true },
        })
        token.id = dbUser?.id ?? user.id
        token.role = dbUser?.role ?? 'EDITOR'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as 'ADMIN' | 'EDITOR' | 'VIEWER'
      }
      return session
    },
  },
})
