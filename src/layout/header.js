import { Logo } from "./logo"
import { NavigationTrigger } from "./navigation-trigger"
import { UserMenu } from "./user-menu"

function Header({ sidebarOpen, onSidebarToggle }) {
  return (
    <header className="header">
      <NavigationTrigger sidebarOpen={sidebarOpen} onSidebarToggle={onSidebarToggle} />
      <Logo sidebarOpen={sidebarOpen} />

      <ul className="top-nav">
        <UserMenu />
      </ul>
    </header>
  )
}

export { Header }
