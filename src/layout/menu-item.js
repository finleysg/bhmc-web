import React from "react"

import { Link as RouterLink, useMatch } from "react-router-dom"

function MenuItem({ path, icon, name }) {
  const match = useMatch(path)
  return (
    <li className={match ? "navigation__active" : ""}>
      <RouterLink to={path}>
        <i>{icon}</i>
        {name}
      </RouterLink>
    </li>
  )
}

export { MenuItem }
