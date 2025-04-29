import React, { ReactNode } from "react"
import RightNav from "./RightNav"
import { auth } from "@/lib/auth"
import { getnotifications } from "@/lib/database"
import AuthButton from "./AuthButton"

const Wrap = ({ children }: { children: ReactNode }) => (
  <header className="flex px-5 py-2 justify-between items-center">
    <h1 className="text-2xl capitalize">Job8080</h1>
    {children}
  </header>
)

export default async function Header() {
  const session = await auth()
  if (!session)
    return (
      <Wrap>
        <AuthButton />
      </Wrap>
    )

  const notifications = await getnotifications(session.user?.id!)
  return (
    <Wrap>
      <RightNav {...{ session, notifications }} />
    </Wrap>
  )
}
