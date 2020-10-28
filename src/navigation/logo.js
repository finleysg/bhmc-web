import "./logo.scss"

import { useLayout } from "layouts/useLayout"
import { Link } from "react-router-dom"

function Logo() {
  const [showSidebar] = useLayout()

  return (
    <div className="header__logo hidden-sm-down">
      <h1>
        <Link to="home">{showSidebar ? "Bunker Hills Men's Golf Club" : "BHMC"}</Link>
      </h1>
    </div>
  )
}

export { Logo }
