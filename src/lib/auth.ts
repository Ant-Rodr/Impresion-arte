import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/cuenta-login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Si la DB no tiene usuarios aún, usar credenciales de .env
        const envEmail = process.env.ADMIN_EMAIL;
        const envPassword = process.env.ADMIN_PASSWORD;

        if (
          credentials.email === envEmail &&
          credentials.password === envPassword
        ) {
          return { id: "env-admin", email: envEmail!, role: "admin" };
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });
          if (!user) return null;

          const valid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          if (!valid) return null;

          return { id: user.id, email: user.email, role: user.role };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
});
