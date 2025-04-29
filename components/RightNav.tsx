"use client"

import { signOut } from "next-auth/react"
import { ModeToggle } from "./ui/mode-toggle"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { LogOut } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"
import Notification from "./Notification"
import { Session } from "next-auth"
import { GetNotifications } from "@/lib/database"

type Props = {
	session: Session
	notifications: GetNotifications
}

export default function RightNav(props: Props) {
	return <nav className="flex justify-between items-center space-x-3">
			<ModeToggle />
			<Notification notifications={props.notifications} />
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						size="icon"
						variant="ghost"
						className="rounded-full overflow-hidden"
					>
						<Image
							src={props.session.user?.image!}
							alt="profile image"
							width={100}
							height={100}
						/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel className="font-bold text-xl">
						My Account
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Link href="">Profile</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href="">Events</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild>
						<Button
							variant="ghost"
							onClick={() => {
								signOut()
							}}
						>
							<LogOut />
							Logout
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</nav>
}
