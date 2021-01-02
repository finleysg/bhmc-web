import React from "react"

import { IconButton } from "components/buttons"
import { IconContext } from "react-icons"
import { IoIosSkipBackward, IoIosSkipForward, IoMdMenu } from "react-icons/io"
import { Link } from "react-router-dom"
import * as config from "utils/app-config"

import { getMonthName } from "./calendar-utils"

function MonthMenu() {
  const [showMenu, setShowMenu] = React.useState(false)
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  return (
    <div className="actions actions--inverse login__actions" onClick={() => setShowMenu(!showMenu)}>
      <div className="dropdown">
        <i className="actions__item">
          <IoMdMenu />
        </i>

        <div className={`dropdown-menu dropdown-menu-right ${showMenu ? "show" : ""}`}>
          {months.map((m) => {
            return (
              <Link
                key={m}
                to={`/calendar/${config.currentSeason}/${getMonthName(m).toLowerCase()}`}
                className="nav-link"
                style={{ padding: ".5rem 1rem" }}
              >
                {getMonthName(m)}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function CalendarHeader({ calendar }) {
  return (
    <IconContext.Provider value={{ color: "white", className: "month-nav" }}>
      <header>
        <div>
          <MonthMenu />
        </div>
        <div className="month-title">
          <IconButton
            to={`/calendar/${
              calendar.lastMonth().year
            }/${calendar.lastMonth().month.toLowerCase()}`}
            color="transparent"
          >
            <IoIosSkipBackward />
          </IconButton>
          <span>
            {calendar.thisMonth().month} {calendar.thisMonth().year}
          </span>
          <IconButton
            to={`/calendar/${
              calendar.nextMonth().year
            }/${calendar.nextMonth().month.toLowerCase()}`}
            color="transparent"
          >
            <IoIosSkipForward />
          </IconButton>
        </div>
      </header>
    </IconContext.Provider>
  )
}

export { CalendarHeader }
