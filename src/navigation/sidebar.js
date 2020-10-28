import "./sidebar.scss"

import React from "react"

import { useLayout } from "layouts/useLayout"
import { MenuItem } from "navigation/menu-item"
import PerfectScrollbar from "perfect-scrollbar"
import { BiEnvelope } from "react-icons/bi"
import { GiGolfFlag, GiTrophyCup } from "react-icons/gi"
import { GoCalendar, GoHome, GoInfo, GoQuestion } from "react-icons/go"
import { GrOrderedList } from "react-icons/gr"
import { MdPeopleOutline } from "react-icons/md"
import { TiContacts } from "react-icons/ti"
import { useEventListener } from "utils/use-event-listener"

import { UserMenu } from "./user-menu"

function Sidebar() {
  const { showSidebar } = useLayout()

  const ps = React.useRef()
  const sidebar = React.useRef()

  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const handler = React.useCallback(() => {
    ps.current.update()
  }, [])

  useEventListener("resize", handler)

  React.useLayoutEffect(() => {
    ps.current = new PerfectScrollbar(sidebar.current, {
      suppressScrollX: true,
      suppressScrollY: false,
    })
    return () => ps.current.destroy()
  }, [])

  return (
    <aside className={showSidebar ? "sidebar" : "sidebar toggled"} ref={sidebar}>
      <UserMenu />
      <ul className="navigation">
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
    </aside>
  )
}

export { Sidebar }
