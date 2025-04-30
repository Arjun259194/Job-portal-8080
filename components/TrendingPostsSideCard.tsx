import { getTrendingPosts } from "@/lib/database"
import { Card, CardContent } from "./ui/card"
import { TrendingUp } from "lucide-react"

export default async function TrendingPostsSideCard() {
	const posts = await getTrendingPosts()

	return (
		<Card>
			<CardContent className="p-4">
				<h3 className="font-semibold mb-2">Trending Now</h3>
				<ul className="text-sm text-foreground space-y-1">
					{posts.map((post, idx) => (
						<li className="grid grid-cols-10" key={idx}>
							<TrendingUp />
							<span className="col-span-9">{post.title}</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
