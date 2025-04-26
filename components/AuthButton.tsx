"use client"

import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export default function AuthButton() {
	const { data: session } = useSession()
	const nav = useRouter()
	return (
		<Button
			onClick={() => {
				if (session) return signOut()
				nav.push("/auth")
			}}
		>
			{!session ? "Signin" : "SignOut"}
		</Button>
	)
}
