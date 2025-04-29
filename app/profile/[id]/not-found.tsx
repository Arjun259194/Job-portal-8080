import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
			<h1 className="text-5xl font-bold mb-4">User Not Found</h1>
			<p className="text-muted-foreground text-lg mb-6">
				The profile you’re looking for doesn’t exist or may have been removed.
			</p>
			<Link href="/home">
				<Button variant="default">Go Back Home</Button>
			</Link>
		</div>
	)
}
