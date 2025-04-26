import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function Home() {
	return (
		<div>
			<Header />
			<main className="my-5">
				<section className="text-center my-10 space-y-5 w-4/5 mx-auto">
					<h1 className="text-5xl font-semibold">
						We help you find what you seek
					</h1>
					<p className="w-2/3 mx-auto">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit.
						Repudiandae excepturi cum? optio eaque vero laboriosam aperiam
						maiores, id maxime nostrum mollitia perspiciatis.
					</p>
					<div className="space-x-5">
            <Link href="/home">
						<Button>Get Started</Button>
            </Link>
						<Link href="/about">
							<Button variant="outline">
								More <ArrowRight />
							</Button>
						</Link>
					</div>
				</section>
			</main>
		</div>
	)
}
