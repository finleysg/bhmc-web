import "./header.scss"

import { Link } from "react-router-dom"

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

function AuthHeader() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#toggler"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link className="navbar-brand" to={"/home"}>
        Bunker Hills Men's Golf Club
      </Link>

      <div className="collapse navbar-collapse" id="toggler">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li>
            <Link to={"/home"} className="nav-link">
              <p>Home</p>
            </Link>
          </li>
          <li className="top-nav--active">
            <Link to={"login"} className="nav-link">
              <p>Login</p>
            </Link>
          </li>
          <li className="">
            <Link to={"register"} className="nav-link">
              <p>Register</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export { AuthHeader, Header }
