import { Bell } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { GetNotifications } from "@/lib/database"
import Link from "next/link"

interface Props {
  notifications: GetNotifications
}

export default function Notification(props: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full overflow-hidden"
        >
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-3 p-2 w-96">
        {props.notifications.map((noti, idx) => {
          return (
            <Link className="" key={idx} href={noti.link ?? "#"}>
              <div
                className={`hover:bg-secondary rounded-sm mb-2 p-1 ${!noti.recevided ? "border-l-2 border-l-blue-500" : ""}`}
              >
                <span>{noti.title}</span>
                <p className="text-sm text-gray-500">{noti.content}</p>
              </div>
            </Link>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
