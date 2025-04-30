import ProfileCard from "@/components/ProfileCard"
import Header from "@/components/Header"
import Post from "@/components/Post"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getposts } from "@/lib/database"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import TrendingPostsSideCard from "@/components/TrendingPostsSideCard"
import action from "@/actions/like"

export default async function page() {
	const session = await auth()

	if (!session || !session.user) redirect("/auth")
	const user = session.user

	const profile = await prisma.profile.findFirst({ where: { userId: user.id } })
	if (!profile) redirect("/profile/form")

	const postsProm = getposts(5)
	const jobsProm = prisma.job.findMany({ take: 5, where: { active: true } })

	const [posts, jobs] = await Promise.all([postsProm, jobsProm])

	return (
		<>
			<Header />
			<main className="flex min-h-screen bg-background p-6 gap-6">
				<section className="flex flex-col w-1/4 gap-4">
					<ProfileCard profile={profile} user={user} />

					<Card>
						<CardContent className="space-y-1">
							<h4 className="text-lg">Top jobs on platform</h4>
							<Separator />
							<ul className="space-y-2">
								{jobs.map((job, idx) => {
									return (
										<li className="text-sm " key={idx}>
											<Link href={`/job/${job.id}`}>
												<span>{job.title}</span>
											</Link>
											<div className="mt-1">
												<Badge variant="outline">
													{job.location.split(",")[0]}
												</Badge>
												<Badge variant="secondary">{job.type}</Badge>
											</div>
										</li>
									)
								})}
							</ul>
						</CardContent>
					</Card>
				</section>

				<section className="flex flex-col w-2/4 gap-4">
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center gap-4 mb-4">
								<Image
									className="rounded-full"
									width={40}
									height={40}
									src={user.image!}
									alt="Profile"
								/>
								<Input placeholder="Start a post" className="rounded-full" />
								<Button className="rounded-full" size="icon">
									<Plus />
								</Button>
							</div>
						</CardContent>
					</Card>

					{posts.map((post, idx) => {
						return (
							<Post session={session} action={action} key={idx} post={post} />
						)
					})}
				</section>

				{/* Right Sidebar */}
				<section className="flex flex-col w-1/4 gap-4">
					<TrendingPostsSideCard />
				</section>
			</main>
		</>
	)
}
