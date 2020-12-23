import React from "react"

import { useClubEvents } from "hooks/event-hooks"
import { useParams } from "react-router-dom"

import { getMonth } from "../features/calendar/calendar-utils"
import { EventCalendar } from "../features/calendar/event-calendar"

function CalendarPage() {
  const { year, monthName } = useParams()
  const { data, isLoading } = useClubEvents()

  const month = getMonth(monthName)
  const events = data?.filter((evt) => evt.isCurrent(+year, month))

  return (
    <div className="row" style={{ minHeight: "calc(100vh - 216px)" }}>
      <div className="col-md-12">
        <EventCalendar year={year} monthName={monthName} events={events} loading={isLoading} />
      </div>
    </div>
  )
}

export default CalendarPage
