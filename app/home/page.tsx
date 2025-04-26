import Sidebar from "@/components/Sidebar"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export default async function page() {
	const session = await auth()
	if (!session || !session.user) redirect("/")
	const user = session.user
	const profile = await prisma.profile.findFirst({ where: { userId: user.id } })
	if (!profile) redirect("/profile/form")
	return (
		<div className="flex w-4/5 mx-auto">
			<Sidebar user={user} />
			<div className="bg-orange-300"></div>
		</div>
	)
}
