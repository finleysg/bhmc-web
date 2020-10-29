import "./header.scss"

import * as colors from "styles/colors"

import { Logo } from "./logo"
import { NavigationTrigger } from "./navigation-trigger"

function Header({ sidebarOpen, onSidebarToggle }) {
  const version = "5.0a"
  const user = { isAuthenticated: false, name: "Guest" }

  return (
    <header className="header">
      <NavigationTrigger sidebarOpen={sidebarOpen} onSidebarToggle={onSidebarToggle} />
      <Logo sidebarOpen={sidebarOpen} />
      <ul className="top-nav">
        <li style={{ float: "right", color: colors.base }}>
          <ul>
            <li>{version}</li>
            <li>{user.name}</li>
          </ul>
        </li>
      </ul>
    </header>
  )
}

export { Header }
