import React from "react"

import { BiDotsVerticalRounded } from "react-icons/bi"
import { Link } from "react-router-dom"

function RoutingMenu({ links }) {
  const [showMenu, setShowMenu] = React.useState(false)

  return (
    <div className="actions actions--inverse login__actions" onClick={() => setShowMenu(!showMenu)}>
      <div className="dropdown">
        <i className="actions__item">
          <BiDotsVerticalRounded />
        </i>

        <div className={`dropdown-menu dropdown-menu-right ${showMenu ? "show" : ""}`}>
          {links.map((link) => {
            return (
              <Link to={link.to} className="dropdown-item">
                {link.name}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { RoutingMenu }
