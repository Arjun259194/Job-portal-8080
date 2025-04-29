import { Card, CardContent } from "@/components/ui/card"
import { Profile } from "@prisma/client"
import { User } from "next-auth"
import Image from "next/image"
import { Badge } from "./ui/badge"

interface Props {
  user: User
  profile: Profile
}

export default async function ProfileCard(props: Props) {
  return (
    <Card>
      <CardContent className="">
        <div className="flex mb-3 space-x-5">
          <Image
            width={60}
            height={60}
            className="rounded-full"
            src={props.user.image!}
            alt="profile"
          />
          <div className="flex flex-col justify-center">
            <h2 className="font-semibold text-lg">{props.user.name}</h2>
            <Badge>{props.profile.location}</Badge>
          </div>
        </div>

        <Skills skills={props.profile.skills} />
      </CardContent>
    </Card>
  )
}

interface SkillsProps {
  skills: string[]
}

function Skills({ skills }: SkillsProps) {
  return (
    <div className="space-x-2">
      {skills.map((skill, idx) => {
        if (idx >= 6) return null
        return (
          <Badge variant="outline" key={idx}>
            {skill}
          </Badge>
        )
      })}
    </div>
  )
}
