import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "../../../utils/supabase";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Use Supabase's sign-in method to authenticate the user
        const { user, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error || !user) {
          console.error("Error signing in:", error);
          return null;
        }

        // Return the user data directly, NextAuth will manage the session
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Store user info in JWT
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // Attach user info to the session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Optional, use a secret for JWT
  session: {
    strategy: "jwt", // Use JWT strategy, no database session needed
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page if needed
  },
});
