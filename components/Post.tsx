"use client"
import Image from "next/image"
import { GetPosts } from "@/lib/database"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"
import { Cloud, ThumbsUp } from "lucide-react"
import { Session } from "next-auth"
import toast from "react-hot-toast"

type Props = {
  session: Session
  post: GetPosts[number]
  action: (postId: string, userId: string) => Promise<void>
}

export default function Post(props: Props) {
  async function handleLike() { }

  return (
    <Card>
      <CardContent className="px-4">
        <div className="flex items-center gap-2 mb-2">
          <Image
            width={40}
            height={40}
            src={props.post.creater.image!}
            alt="profile-image"
            className="rounded-full"
          />
          <div>
            <h4 className="font-semibold text-sm">{props.post.creater.name}</h4>
          </div>
        </div>
        <h4 className="text-2xl font-semibold">{props.post.title}</h4>
        <Separator />
        <p className="text-sm my-2">{props.post.content}</p>
        <div className="grid grid-cols-2 text-gray-500 text-xs">
          <Button
            onClick={async () => {
              try {
                console.log("Called")
                const response = await props.action(
                  props.post.id,
                  props.session.user?.id!,
                )
                console.log("response:", response)
              } catch (err) {
                toast.error(`${err}`)
              }
            }}
            variant="ghost"
            size="sm"
          >
            {props.post.likes.some(like => {
              return like.id === props.session.user?.id!
            }) ? (
              <ThumbsUp className="text-pink-400 bg-pink-300/50" />
            ) : (
              <ThumbsUp />
            )}
            {props.post.likes.length}
          </Button>
          <Button variant="ghost" size="sm">
            <Cloud /> Comment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
