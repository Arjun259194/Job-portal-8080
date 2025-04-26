"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Chrome, Github } from "lucide-react"
import { signIn } from "next-auth/react"

export const Auth = () => {
	return (
		<div className="bg-background shadow-xl rounded-lg p-8 w-full">
			<h1 className="text-2xl font-bold text-foreground text-center mb-6">
        Join us with provider of your choice
			</h1>

			<div className="flex flex-col gap-3">
				<Button
					variant="outline"
					onClick={() => signIn("google")}
				>
					<Chrome className="h-5 w-5" /> Google
				</Button>
				<Button
					variant="outline"
					onClick={() => signIn("github")}
				>
					<Github className="h-5 w-5" /> GitHub
				</Button>
			</div>
		</div>
	)
}
