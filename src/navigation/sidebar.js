/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"

import React from "react"

import { MenuItem } from "navigation/menu-item"
import PerfectScrollbar from "perfect-scrollbar"
import { BiEnvelope } from "react-icons/bi"
import { GiGolfFlag, GiTrophyCup } from "react-icons/gi"
import { GoCalendar, GoHome, GoInfo, GoQuestion } from "react-icons/go"
import { GrOrderedList } from "react-icons/gr"
import { MdPeopleOutline } from "react-icons/md"
import { TiContacts } from "react-icons/ti"
import { useEventListener } from "utils/use-event-listener"

function Sidebar(props) {
  const { color, hasImage, image, isMini } = props
  console.log(`Sidebar says isMini is ${isMini}`)

  const ps = React.useRef()
  const sidebar = React.useRef()
  // const [width, setWidth] = React.useState(0)

  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const handler = React.useCallback(() => {
    // setWidth(window.innerWidth),
    ps.current.update()
  }, [])

  // Add event listener using our hook
  useEventListener("resize", handler)

  React.useLayoutEffect(() => {
    ps.current = new PerfectScrollbar(sidebar.current, {
      suppressScrollX: true,
      suppressScrollY: false,
    })
    return () => ps.current.destroy()
  }, [])

  return (
    <div className="sidebar" data-color={color} data-image={image}>
      {hasImage && <div className="sidebar-background" style={{ backgroundImage: "url(" + image + ")" }} />}
      <div className="sidebar-wrapper" ref={sidebar}>
        <div className="logo">
          {isMini ? (
            <span className="simple-text">BHMC</span>
          ) : (
            <span className="simple-text">Bunker Hills Men's Golf Club</span>
          )}
        </div>
        <ul
          className="sidebar-nav"
          //   css={{
          //     paddingLeft: 0,
          //     marginBottom: 0,
          //     listStyle: "none",
          //   }}
        >
          {/* {width <= 992 ? <AdminNavbarLinks /> : null} */}
          <MenuItem path="home" icon={<GoHome />} name="Home" />
          <MenuItem path="calendar" icon={<GoCalendar />} name="Event Calendar" />
          <MenuItem path="results" icon={<GrOrderedList />} name="Event Results" />
          <MenuItem path="policies" icon={<GoInfo />} name="Policies" />
          <MenuItem path="match-play" icon={<MdPeopleOutline />} name="Match Play" />
          <MenuItem path="season-long-points" icon={<GiGolfFlag />} name="Season Long Points" />
          <MenuItem path="dam-cup" icon={<GiTrophyCup />} name="Dam Cup" />
          <MenuItem path="directory" icon={<TiContacts />} name="Member Directory" />
          <MenuItem path="contact-us" icon={<BiEnvelope />} name="Contact Us" />
          <MenuItem path="about-us" icon={<GoQuestion />} name="About Us" />
        </ul>
      </div>
    </div>
  )
}

export { Sidebar }
