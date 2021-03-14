import React from "react"

import { useEventAdmin } from "context/admin-context"
import { isMobile } from "styles/media-queries"

import { NavigationTrigger } from "./navigation-trigger"
import { UserMenu } from "./user-menu"

function AdminHeader() {
  const { clubEvent } = useEventAdmin()

  return (
    <header className="header">
      <NavigationTrigger />
      <div className="header__logo">
        {isMobile() ? <h1>{clubEvent?.name}</h1> : <h1>Event Administration: {clubEvent?.name}</h1>}
      </div>
      <ul className="top-nav">
        <UserMenu />
      </ul>
    </header>
  )
}

export { AdminHeader }
