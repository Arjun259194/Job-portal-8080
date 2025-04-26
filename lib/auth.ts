import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { prisma } from "./prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { redirect } from "next/navigation"

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [GitHub, Google],
	events: {
		async signIn({ user }) {
			const result = await prisma.profile.findFirst({
				where: { userId: user.id },
			})
			if (!result) redirect("/profile/form")
		},
	},
})
