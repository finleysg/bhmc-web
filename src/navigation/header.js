/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core"

import routes from "navigation/routes"
import Navbar from "react-bootstrap/Navbar"
import { FaEllipsisV } from "react-icons/fa"
import { GiHamburgerMenu } from "react-icons/gi"
import { useLocation } from "react-router-dom"
import * as colors from "styles/colors"
import { rgba } from "styles/rgba"

import { AdminMenu } from "./admin-menu"
import { UserMenu } from "./user-menu"

const navbarOverride = css({
  padding: "0 15px 0 15px",
  height: "64px",
  borderBottom: `1px solid ${rgba("#000000", 0.1)}`,
  backgroundColor: colors.base,
})

function Header(props) {
  const { color, onSidebarMiniChange } = props
  const location = useLocation()

  // TODO: improve this to display a friendly location name
  const getActiveRoute = () => {
    const activeRoute = location.pathname
    return activeRoute
  }
  // function for responsive that hides/shows the sidebar
  const mobileSidebarToggle = () => {
    document.documentElement.classList.toggle("nav-open")
  }

  const toggleMiniSidebar = () => {
    document.body.classList.toggle("sidebar-mini")
    onSidebarMiniChange()
  }

  const buttonClassByThemeColor = () => {
    switch (props.color) {
      case "black":
        return "btn-default"
      case "azure":
        return "btn-info"
      case "green":
        return "btn-success"
      case "orange":
        return "btn-warning"
      case "red":
        return "btn-danger"
      case "purple":
        return "btn-primary"
      default:
        return "btn-default"
    }
  }

  return (
    <Navbar css={navbarOverride} sticky="top">
      <div className="navbar-minimize">
        <button
          data-color={color}
          id="minimizeSidebar"
          style={{ height: "38px", width: "38px" }}
          className={"btn btn-fill btn-round btn-icon " + buttonClassByThemeColor()}
          onClick={toggleMiniSidebar}
        >
          <FaEllipsisV className="visible-on-sidebar-regular" />
          <GiHamburgerMenu className="visible-on-sidebar-mini" />
        </button>
      </div>
      <Navbar.Brand>{getActiveRoute(routes)}</Navbar.Brand>
      <Navbar.Toggle onClick={mobileSidebarToggle} />

      {window.innerWidth > 992 && (
        <Navbar.Collapse className="justify-content-end">
          <AdminMenu />
          <UserMenu />
        </Navbar.Collapse>
      )}
    </Navbar>
  )
}

export { Header }
