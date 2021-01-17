import React from "react"

import { useClubEvents } from "hooks/event-hooks"
import { useParams } from "react-router-dom"

import { getMonth } from "../components/calendar/calendar-utils"
import { EventCalendar } from "../components/calendar/event-calendar"

function CalendarPage() {
  const { year, monthName } = useParams()
  const events = useClubEvents(year)

  const month = getMonth(monthName)
  const currentEvents = events.filter((evt) => evt.isCurrent(+year, month))

  return (
    <div className="row" style={{ minHeight: "calc(100vh - 216px)" }}>
      <div className="col-md-12">
        <EventCalendar year={year} monthName={monthName} events={currentEvents} loading={false} />
      </div>
    </div>
  )
}

export default CalendarPage
