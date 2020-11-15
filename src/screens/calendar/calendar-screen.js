import "./calendar.scss"

import React from "react"

import { useParams } from "react-router-dom"
import { client } from "utils/api-client"
import { useAsync } from "utils/use-async"

import { getMonth } from "./calendar-utils"
import { EventCalendar } from "./event-calendar"

function CalendarScreen() {
  const { year, monthName } = useParams()
  const { data, error, run, isLoading, isError } = useAsync()

  React.useEffect(() => {
    run(client(`api/events/?year=${year}&month=${getMonth(monthName, false)}`))
  }, [year, monthName, run])

  return (
    <div className="row" style={{ minHeight: "calc(100vh - 216px)" }}>
      <div className="col-md-12">
        {isError ? (
          <div>
            <h4>There was a problem loading the calendar</h4>
            <pre style={{ color: "red" }}>{error}</pre>
          </div>
        ) : (
          <EventCalendar year={year} monthName={monthName} events={data} loading={isLoading} />
        )}
      </div>
    </div>
  )
}

export default CalendarScreen
