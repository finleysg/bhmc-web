import React from "react"

import { useAuth } from "context/auth-context"
import { useLayout } from "context/layout-context"
import { useSelectedMonth } from "hooks/calendar-hooks"
import {
  BiEnvelope,
  BiLogInCircle,
} from "react-icons/bi"
import {
  GiGolfFlag,
  GiTrophyCup,
} from "react-icons/gi"
import {
  GoCalendar,
  GoHome,
  GoInfo,
  GoPlus,
  GoQuestion,
} from "react-icons/go"
import { GrOrderedList } from "react-icons/gr"
import {
  MdPeopleOutline,
  MdPersonAdd,
} from "react-icons/md"
import { TiContacts } from "react-icons/ti"
import * as config from "utils/app-config"

import { MenuItem } from "./menu-item"

function Sidebar() {
  const { sidebarOpen } = useLayout()
  const { user } = useAuth()
  const [selectedMonth] = useSelectedMonth()

  return (
    <aside className={sidebarOpen ? "sidebar sidebar--bg toggled" : "sidebar sidebar--bg"}>
      <ul className="navigation">
        <MenuItem path="home" icon={<GoHome />} name="Home" />
        <MenuItem
          path="membership"
          icon={<GoPlus />}
          name={`${config.currentSeason} Signup Page`}
        />
        <MenuItem
          path={`calendar/${selectedMonth.year}/${selectedMonth.monthName.toLowerCase()}`}
          icon={<GoCalendar />}
          name="Event Calendar"
        />
        <MenuItem
          path={`results/weeknight-events/${config.currentSeason}`}
          icon={<GrOrderedList />}
          name="Event Results"
        />
        <MenuItem path="policies/policies-and-procedures" icon={<GoInfo />} name="Policies" />
        <MenuItem path="match-play" icon={<MdPeopleOutline />} name="Match Play" />
        <MenuItem path="season-long-points" icon={<GiGolfFlag />} name="Season Long Points" />
        <MenuItem path="dam-cup" icon={<GiTrophyCup />} name="Dam Cup" />
        {user && user.is_authenticated && (
          <MenuItem path="directory" icon={<TiContacts />} name="Member Directory" />
        )}
        <MenuItem path="contact-us" icon={<BiEnvelope />} name="Contact Us" />
        <MenuItem path="about-us" icon={<GoQuestion />} name="About Us" />
        {user && !user.is_authenticated && (
          <React.Fragment>
            <MenuItem path="session/login" icon={<BiLogInCircle />} name="Login" />
            <MenuItem path="session/account" icon={<MdPersonAdd />} name="Create an Account" />
          </React.Fragment>
        )}
      </ul>
    </aside>
  )
}

export { Sidebar }
