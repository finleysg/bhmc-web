import { Link } from "react-router-dom"

import { AuthMenu } from "./auth-menu"

function AuthHeader() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
      <div className="logo">
        <Link className="navbar-brand" to={"/home"}>
          Bunker Hills Men's Golf Club
        </Link>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="mr-auto"></ul>
        <AuthMenu />
      </div>
    </nav>
  )
}

export { AuthHeader }
