import { User } from "next-auth"
import React from "react"

interface Props {
	user: User
}

export default function Sidebar({ user }: Props) {
	return <aside className="">
    <div></div>
  </aside>
}
