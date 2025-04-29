import { prisma } from "./prisma"

export type GetPosts = Awaited<ReturnType<typeof getposts>>
export async function getposts(take = 20, skip = 0) {
	return await prisma.post.findMany({
		skip,
		take,
		include: {
			likes: true,
			creater: true,
			comments: true,
		},
	})
}

export type GetNotifications = Awaited<ReturnType<typeof getnotifications>>
export async function getnotifications(id: string) {
	return await prisma.notification.findMany({ take: 10, where: { userId: id } })
}

export type GetUser = Awaited<ReturnType<typeof getUser>>
export async function getUser(id: string) {
	return await prisma.user.findFirst({
		where: { id },
		include: {
			Post: true,
			liked: true,
			Profile: true,
			PostComment: true,
		},
	})
}

export type GetTrendingPosts = Awaited<ReturnType<typeof getTrendingPosts>>
export async function getTrendingPosts() {
	return await prisma.post.findMany({
		take: 5,
		orderBy: {
			likes: {
				_count: "desc",
			},
		},
		include: {
			_count: {
				select: {
					likes: true,
				},
			},
		},
	})
}
