/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core"

import routes from "navigation/routes"
import Navbar from "react-bootstrap/Navbar"
import { FaEllipsisV, FaHamburger } from "react-icons/fa"
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
  const getActiveRoute = (routes, parentPath) => {
    let activeRoute = "Default Brand Text"
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views, routes[i].parentPath)
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute
        }
      } else {
        const fullPath = `${parentPath || ""}${routes[i].path}`
        // TODO: use location or match
        if (window.location.href.indexOf(fullPath) !== -1) {
          return routes[i].name
        }
      }
    }
    return activeRoute
  }
  // function for responsive that hides/shows the sidebar
  const mobileSidebarToggle = () => {
    document.documentElement.classList.toggle("nav-open")
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
          data-color={props.color}
          id="minimizeSidebar"
          style={{ height: "38px", width: "38px" }}
          className={"btn btn-fill btn-round btn-icon " + buttonClassByThemeColor()}
          onClick={props.handleMiniClick}
        >
          <FaEllipsisV className="visible-on-sidebar-regular" />
          <FaHamburger className="visible-on-sidebar-mini" />
        </button>
      </div>
      <Navbar.Brand>
        {/* Here we create navbar brand, based on route name */}
        {getActiveRoute(routes)}
      </Navbar.Brand>
      <Navbar.Toggle onClick={mobileSidebarToggle} />

      {/* Here we import the links that appear in navbar */}
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
