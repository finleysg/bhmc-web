import React from "react"

import { useLayout } from "context/layout-context"
import { Groups, useGroups } from "hooks/account-hooks"
import { useSelectedMonth } from "hooks/calendar-hooks"
import { BiEnvelope, BiLogInCircle } from "react-icons/bi"
import { GiGolfFlag, GiGolfTee, GiTrophyCup } from "react-icons/gi"
import { GoCalendar, GoHome, GoInfo, GoPlus, GoQuestion } from "react-icons/go"
import { GrOrderedList } from "react-icons/gr"
import { MdPeopleOutline, MdPersonAdd } from "react-icons/md"
import { TiContacts } from "react-icons/ti"
import * as config from "utils/app-config"

import { MenuItem } from "./menu-item"

function Sidebar() {
  const { sidebarOpen } = useLayout()
  const groups = useGroups()
  const [selectedMonth] = useSelectedMonth()

  return (
    <aside className={sidebarOpen ? "sidebar sidebar--bg toggled" : "sidebar sidebar--bg"}>
      <ul className="navigation">
        <MenuItem path="home" icon={<GoHome />} name="Home" />
        <MenuItem path="scorecards/east-west" icon={<GiGolfTee />} name="Gold/White Combo Tees" />
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
        {groups.indexOf(Groups.AuthenticatedUsers) >= 0 && (
          <MenuItem path="directory" icon={<TiContacts />} name="Account Directory" />
        )}
        <MenuItem path="contact-us" icon={<BiEnvelope />} name="Contact Us" />
        <MenuItem path="about-us" icon={<GoQuestion />} name="About Us" />
        {groups.indexOf(Groups.Guests) >= 0 && (
          <React.Fragment>
            <MenuItem path="session/login" icon={<BiLogInCircle />} name="Login" />
            <MenuItem path="session/account" icon={<MdPersonAdd />} name="Create an Account" />
          </React.Fragment>
        )}
        {groups.indexOf(Groups.PaulHelpers) >= 0 && (
          <li>
            <a
              href="https://docs.google.com/spreadsheets/d/1d0DyeELbWPKCX8kHqi0gdBsRVx83HZMm-LiBhBSBw-w/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              Paul's Schedule
            </a>
          </li>
        )}
      </ul>
    </aside>
  )
}

export { Sidebar }
