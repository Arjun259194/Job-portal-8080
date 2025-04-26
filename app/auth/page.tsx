import { Auth } from "@/components/Auth"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import React from "react"

const page = async () => {
	const session = await auth()
	if (session) redirect("/")
	return (
		<div className="min-h-screen flex items-center justify-center bg-sidebar-accent relative overflow-hidden">
			<div className="absolute inset-0 z-0 bg-[url('/stars.svg')] bg-cover opacity-20" />
			<div className="relative z-10 w-full max-w-md px-4">
				<Auth />
			</div>
		</div>
	)
}

export default page
