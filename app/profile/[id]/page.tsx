import Header from "@/components/Header"
import Post from "@/components/Post"
import { getUser } from "@/lib/database"
import { notFound } from "next/navigation"

interface Props {
	params: Promise<{
		id: string
	}>
}

export default async function page(props: Props) {
	const { id } = await props.params
	const user = await getUser(id)
	if (!user) notFound()

	return (
		<div>
			<Header />
			<main>
				<div>
					<h1> {user.name} </h1>
					<p>{user.Profile?.summary}</p>
				</div>
				<div>
					{user.Post.map(post => {
						return <div>
              <h2>{post.content}</h2>
            </div>
					})}
				</div>
			</main>
		</div>
	)
}
