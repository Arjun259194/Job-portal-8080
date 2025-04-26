import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { User } from "next-auth"
import Image from "next/image"

interface Props {
	user: User
}

export default async function ProfileCard(props: Props) {
	return (
		<Card>
			<CardContent className="flex flex-col items-center p-6">
				<Image
					className="rounded-full"
					src={props.user.image!}
					width={100}
					height={100}
					alt="profile"
				/>
				<h2 className="font-semibold text-lg">Arjun Mistry</h2>
				<p className="text-sm text-gray-500 text-center">
					{
						//TODO
					}
				</p>
				<Button variant="outline" size="sm" className="mt-4 w-full">
					+ Experience
				</Button>
			</CardContent>
		</Card>
	)
}
