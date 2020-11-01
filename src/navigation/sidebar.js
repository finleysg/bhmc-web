import "./sidebar.scss"

import React from "react"

import { MenuItem } from "navigation/menu-item"
import { BiEnvelope, BiLogInCircle } from "react-icons/bi"
import { GiGolfFlag, GiTrophyCup } from "react-icons/gi"
import { GoCalendar, GoHome, GoInfo, GoPlus, GoQuestion } from "react-icons/go"
import { GrOrderedList } from "react-icons/gr"
import { MdPeopleOutline, MdPersonAdd } from "react-icons/md"
import { TiContacts } from "react-icons/ti"

function Sidebar({ open }) {
  return (
    <aside className={open ? "sidebar toggled" : "sidebar"}>
      <ul className="navigation">
        <MenuItem path="home" icon={<GoHome />} name="Home" />
        <MenuItem path="sign-up" icon={<GoPlus />} name="Sign Up for 2021" />
        <MenuItem path="calendar" icon={<GoCalendar />} name="Event Calendar" />
        <MenuItem path="results" icon={<GrOrderedList />} name="Event Results" />
        <MenuItem path="policies" icon={<GoInfo />} name="Policies" />
        <MenuItem path="match-play" icon={<MdPeopleOutline />} name="Match Play" />
        <MenuItem path="season-long-points" icon={<GiGolfFlag />} name="Season Long Points" />
        <MenuItem path="dam-cup" icon={<GiTrophyCup />} name="Dam Cup" />
        <MenuItem path="directory" icon={<TiContacts />} name="Member Directory" />
        <MenuItem path="contact-us" icon={<BiEnvelope />} name="Contact Us" />
        <MenuItem path="about-us" icon={<GoQuestion />} name="About Us" />
        <MenuItem path="session/login" icon={<BiLogInCircle />} name="Login" />
        <MenuItem path="session/register" icon={<MdPersonAdd />} name="Create an Account" />
      </ul>
    </aside>
  )
}

export { Sidebar }
