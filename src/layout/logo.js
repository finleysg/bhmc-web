import { Link } from "react-router-dom"

function Logo({ sidebarOpen }) {
  return (
    <div className="header__logo hidden-sm-down">
      <h1>
        <Link to="home">{sidebarOpen ? "Bunker Hills Men's Golf Club" : "BHMC"}</Link>
      </h1>
    </div>
  )
}

export { Logo }
