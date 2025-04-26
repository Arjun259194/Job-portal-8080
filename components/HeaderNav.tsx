"use client"

import { signOut, useSession } from "next-auth/react"
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
import AuthButton from "./AuthButton"

export default function HeaderNav() {
	const { data: session } = useSession()

	return (
		<nav className="flex justify-between items-center space-x-3">
			<ModeToggle />
			{session && session.user ? (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								size="icon"
								variant="ghost"
								className="rounded-full overflow-hidden"
							>
								<Image
									src={session.user?.image!}
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
				</>
			) : (
				<AuthButton />
			)}
		</nav>
	)
}
