"use server"
import { Input } from "@/components/ProfileForm"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export default async function action(input: Input): Promise<void> {
	const session = await auth()
	if (!session) throw new Error("Not authorized")
	const user = session.user!
	if (!user.id) throw new Error("User id not available")

	try {
		await prisma.profile.upsert({
			where: { userId: user.id },
			create: {
				userId: user.id,
				educations: { create: input.education },
				experiences: { create: input.experienc },
				location: input.location,
				skills: input.skills,
				summary: input.summary,
				website: input.website || null,
			},
			update: {
				educations: {
					deleteMany: {},
					create: input.education,
				},
				experiences: {
					deleteMany: {},
					create: input.experienc,
				},
				location: input.location,
				skills: input.skills,
				summary: input.summary,
				website: input.website,
			},
		})
	} catch (err) {
		console.error("err:", err)
		throw new Error("Server side error")
	}
}
