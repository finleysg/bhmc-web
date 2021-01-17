import React from "react"

import { format } from "date-fns"

import { CalendarEvent } from "./calendar-event"

function CalendarDay({ day, currentMonthNbr }) {
  const dayClasses = () => {
    const classes = []
    if (day.isToday) classes.push("today")
    if (day.date.getMonth() !== currentMonthNbr) classes.push("other-month")
    if (!day.hasEvents()) classes.push("hidden-xs-down")
    return classes.length > 0 ? classes.join(" ") : ""
  }

  return (
    <li className={dayClasses()}>
      <div className="date hidden-xs-down">{day.day}</div>
      <div className="date hidden-sm-up">{format(day.date, "iiii, MMMM do")}</div>
      {day.hasEvents() &&
        day.events.map((evt) => {
          return <CalendarEvent key={evt.id} clubEvent={evt} />
        })}
    </li>
  )
}

export { CalendarDay }
