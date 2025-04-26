import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import ProfileCard from "@/components/ProfileCard"

export default async function page() {
	const session = await auth()
	if (!session || !session.user) redirect("/")
	const user = session.user
	const profile = await prisma.profile.findFirst({ where: { userId: user.id } })
	if (!profile) redirect("/profile/form")

	const fullUser = await prisma.user.findFirst({
		where: { id: user.id },
		include: {
			Profile: true,
			notifications: true,
		},
	})

	return (
		<main className="flex min-h-screen bg-[#f3f2ef] p-6 gap-6">
			{/* Left Sidebar */}
			<section className="flex flex-col w-1/4 gap-4">
				<ProfileCard user={user} />

				{/* Connections */}
				<Card>
					<CardContent className="p-4">
						<div className="text-sm flex flex-col gap-1">
							<span className="font-semibold">Connections</span>
							<span className="text-blue-600">27</span>
							<span className="text-gray-500 mt-2">Grow your network</span>
						</div>
					</CardContent>
				</Card>

				{/* Premium Try */}
				<Card>
					<CardContent className="p-4">
						<p className="text-sm font-semibold mb-2">Accelerate your career</p>
						<Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
							Try for ₹0
						</Button>
					</CardContent>
				</Card>

				{/* Saved items etc */}
				<Card>
					<CardContent className="flex flex-col gap-2 p-4 text-sm">
						<span>Saved items</span>
						<span>Groups</span>
						<span>Newsletters</span>
						<span>Events</span>
					</CardContent>
				</Card>
			</section>

			{/* Middle Feed */}
			<section className="flex flex-col w-2/4 gap-4">
				{/* Start Post */}
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-4 mb-4">
							<div className="h-12 w-12 rounded-full bg-gray-300" />
							<Input placeholder="Start a post" className="rounded-full" />
						</div>
						<div className="flex justify-around text-gray-500 text-sm">
							<Button variant="ghost" size="sm">
								📷 Media
							</Button>
							<Button variant="ghost" size="sm">
								🎉 Event
							</Button>
							<Button variant="ghost" size="sm">
								✍️ Write article
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Example Post */}
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-2 mb-2">
							<div className="h-10 w-10 rounded-full bg-gray-300" />
							<div>
								<h4 className="font-semibold text-sm">Ikramul Shekh</h4>
								<p className="text-xs text-gray-500">Software Engineer • 1w</p>
							</div>
						</div>
						<p className="text-sm mb-4">Note: this is not a hiring post!</p>
						<div className="flex justify-between text-gray-500 text-xs">
							<Button variant="ghost" size="sm">
								👍 Like
							</Button>
							<Button variant="ghost" size="sm">
								💬 Comment
							</Button>
							<Button variant="ghost" size="sm">
								🔁 Repost
							</Button>
							<Button variant="ghost" size="sm">
								📤 Send
							</Button>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* Right Sidebar */}
			<section className="flex flex-col w-1/4 gap-4">
				{/* Trending Now */}
				<Card>
					<CardContent className="p-4">
						<h3 className="font-semibold mb-2">Trending Now</h3>
						<ul className="text-sm text-gray-700 space-y-1">
							<li>• International tourists shun the US</li>
							<li>• GCC hiring zooms ahead of IT</li>
							<li>• CEO exits on the rise</li>
							<li>• Motorola debuts AI-infused phones</li>
							<li>• India tops digital banking charts</li>
						</ul>
					</CardContent>
				</Card>

				{/* Today's Puzzle */}
				<Card>
					<CardContent className="p-4">
						<h3 className="font-semibold mb-2">Today's Puzzle</h3>
						<div className="flex items-center gap-2">
							<div className="h-12 w-12 bg-orange-300 rounded" />
							<p className="text-sm">Zip - a quick brain teaser</p>
						</div>
					</CardContent>
				</Card>
			</section>
		</main>
	)
}
