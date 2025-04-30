import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import {
	Target,
	MousePointerClick,
	Bell,
	Search,
	Upload,
	ListChecks,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const data = [
	{
		title: "Smart Job Matches",
		description:
			"Get personalized job recommendations tailored to your skills, goals, and interests.",
		icon: Target,
	},
	{
		title: "One-Click Apply",
		description:
			"Apply to jobs faster with pre-filled resumes and saved preferences.",
		icon: MousePointerClick,
	},
	{
		title: "Real-Time Notifications",
		description: "Stay updated on new openings and application status changes.",
		icon: Bell,
	},
	{
		title: "Find the Right Talent",
		description:
			"Access a growing pool of skilled candidates with smart filters.",
		icon: Search,
	},
	{
		title: "Post Jobs Easily",
		description: "Publish jobs in seconds with our user-friendly interface.",
		icon: Upload,
	},
	{
		title: "Track Applications",
		description: "Keep all your job applications in one clean dashboard.",
		icon: ListChecks,
	},
]

export default async function Home() {
	return (
		<div>
			<Header />
			<main className="my-5">
				<section className="text-center my-10 space-y-5 w-4/5 mx-auto">
					<h1 className="text-5xl font-semibold">
						Your Next Opportunity Starts Here
					</h1>
					<div className="w-2/3 mx-auto space-x-3">
						<Badge variant="secondary">
							Built for designers, marketers, and more
						</Badge>
						<Badge variant="secondary">Fast, intuitive, and modern </Badge>
						<Badge variant="secondary">Privacy-first platform</Badge>
						<Badge variant="secondary">Remote and local job</Badge>
						<Badge variant="secondary">Instant job alerts</Badge>
						<Badge variant="secondary">Verified employers</Badge>
						<Badge variant="secondary">Candidate insights</Badge>
						<Badge variant="secondary">Remote jobs</Badge>
						<Badge variant="secondary">Freelance gigs</Badge>
						<Badge variant="secondary">Internships</Badge>
					</div>
					<p className="w-2/3 mx-auto">
						Whether you're hiring or job hunting, our platform simplifies the
						process. Browse thousands of verified jobs or post an opening in
						minutes.
					</p>
					<div className="space-x-5">
						<Link href="/home">
							<Button size="lg">Get Started</Button>
						</Link>
						<Link href="/about">
							<Button size="lg" variant="outline">
								More <ArrowRight />
							</Button>
						</Link>
					</div>
				</section>

				<section className=" w-4/5 mx-auto space-y-5">
					<div className="grid gap-5 grid-cols-3">
						{data.map(({ icon: Icon, title, description }, idx) => {
							return (
								<div
									className="border-2 border-border space-y-3 hover:shadow-violet-400 shadow-md shadow-border p-3 rounded-md"
									key={idx}
								>
									<Icon className="text-violet-400 w-10 h-10" />
									<span className="text-2xl">{title}</span>
									<p className="text-sm text-secondary-foreground">
										{description}
									</p>
								</div>
							)
						})}
					</div>
				</section>
			</main>
		</div>
	)
}
