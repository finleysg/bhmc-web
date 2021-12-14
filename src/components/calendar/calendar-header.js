import React from "react"

import { IconButton } from "components/button/buttons"
import { IconContext } from "react-icons"
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io"

import { MonthMenu } from "./month-menu"
import { YearMenu } from "./year-menu"

function CalendarHeader({ calendar }) {
  return (
    <IconContext.Provider value={{ color: "white", className: "month-nav" }}>
      <header>
        <div className="month-title">
          <IconButton
            to={`/calendar/${calendar.lastMonth().year}/${calendar.lastMonth().month.toLowerCase()}`}
            color="transparent"
          >
            <IoIosSkipBackward />
          </IconButton>
          <div style={{ display: "inline-block" }}>
            <MonthMenu currentYear={calendar.thisMonth().year} style={{ display: "inline-block" }}>
              <span style={{ cursor: "pointer", margin: 0 }}>{calendar.thisMonth().month}</span>
            </MonthMenu>{" "}
            <YearMenu currentMonth={calendar.thisMonth().month} style={{ display: "inline-block" }}>
              <span style={{ cursor: "pointer", margin: 0 }}>{calendar.thisMonth().year}</span>
            </YearMenu>
          </div>
          <IconButton
            to={`/calendar/${calendar.nextMonth().year}/${calendar.nextMonth().month.toLowerCase()}`}
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
