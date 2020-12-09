import React from "react"

import { useLayout } from "context/layout-context"
import { Link as RouterLink, useMatch } from "react-router-dom"

function MenuItem({ path, icon, name }) {
  const { closeSidebar } = useLayout()
  const match = useMatch(path)

  return (
    <li className={match ? "navigation__active" : ""}>
      <RouterLink to={path} onClick={closeSidebar}>
        <i>{icon}</i>
        {name}
      </RouterLink>
    </li>
  )
}

export { MenuItem }
