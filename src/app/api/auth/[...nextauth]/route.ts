import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { conn } from "@/libs/db";
import { UserResult } from "@/interfaces/userResult.d";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials!.email || !credentials!.password) {
          throw new Error("Email and password are required.");
        }

        const emailExistsQuery = "SELECT * FROM users WHERE user_email = ?";

        const emailExistsResult: UserResult[] = await conn.query<UserResult[]>(
          emailExistsQuery,
          [credentials!.email]
        );

        if (emailExistsResult.length === 0) {
          throw new Error("Invalid credentials");
        }

        const userFound = emailExistsResult[0];

        console.log(userFound);

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.user_password
        );

        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }
        userFound.user_password = credentials!.password;

        return userFound as any;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
