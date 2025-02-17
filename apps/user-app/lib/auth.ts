import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import { prisma } from "@repo/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "sanskar@gmail.com" },        
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        // 🔹 Find the user by email
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            name: true,
            email: true,
            phone: true,
            password: true,
            id: true,
            Balance: {
              select: {
                amount: true,
                locked: true
              }
            }
          }
        });

        if (existingUser) {
          // 🔹 Compare the hashed password
          const passwordValid = await bcrypt.compare(credentials.password, existingUser.password);
          if (!passwordValid) {
            throw new Error("Invalid email or password");
          }

          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.email,
            phone: existingUser.phone,
          };
        }
        else {
          throw new Error("Email or password are incorrect")
        }
      }
    })
  ],
  secret: process.env.JWT_SECRET || "",
  callbacks: {
    async session({ session, token }: {session: any, token: any}) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  },
  pages: {
    signIn: "/signin"
  }
};