import React from "react"
import HeaderNav from "./HeaderNav"

export default function Header() {
	return (
		<header className="flex px-5 py-2 justify-between items-center">
			<h1 className="text-2xl capitalize">Job8080</h1>
      <HeaderNav />
		</header>
	)
}
