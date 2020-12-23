import React from "react"

import { useAuth } from "context/auth-context"
import { Link } from "react-router-dom"
import * as colors from "styles/colors"

function UserMenu() {
  const [showMenu, setShowMenu] = React.useState(false)
  const { user, logout } = useAuth()

  const handleLogout = () => {
    setShowMenu(false)
    logout()
  }

  const anonymousMenu = () => {
    return (
      <li style={{ float: "right", color: colors.base }}>
        <ul style={{ listStyle: "none" }}>
          <li>Guest</li>
        </ul>
      </li>
    )
  }

  const authenticatedMenu = () => {
    return (
      <li className="nav-item dropdown">
        <button className="nav-link dropdown-toggle" onClick={() => setShowMenu(!showMenu)}>
          {`${user.first_name} ${user.last_name}`}
        </button>
        <div className={`dropdown-menu dropdown-menu-right ${showMenu ? "show" : ""}`}>
          <Link onClick={() => setShowMenu(false)} to="my-account" className="dropdown-item">
            My Account
          </Link>
          <Link onClick={() => setShowMenu(false)} to="settings" className="dropdown-item">
            My Events
          </Link>
          <div className="dropdown-divider"></div>
          <button onClick={handleLogout} className="dropdown-item">
            Logout
          </button>
        </div>
      </li>
    )
  }

  if (user?.is_authenticated) {
    return authenticatedMenu()
  }

  return anonymousMenu()
}

export { UserMenu }
