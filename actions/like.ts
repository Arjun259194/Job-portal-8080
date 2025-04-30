"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export default async function action(postId: string, userId: string) {
  try {
    const post = await prisma.post.findFirst({
      where: { id: postId },
      select: {
        likes: {
          where: {
            id: userId,
          },
        },
      },
    })

    if (!post) throw new Error("Post not found")

    const isLiked = post.likes.length > 0

    await prisma.post.update({
      where: { id: postId },
      data: {
        likes: isLiked
          ? { disconnect: { id: userId } }
          : { connect: { id: userId } },
      },
    })

    console.log("Done")
    revalidatePath("/home")
  } catch (err) {
    console.error(err)
    throw new Error("Error in server action")
  }
}
