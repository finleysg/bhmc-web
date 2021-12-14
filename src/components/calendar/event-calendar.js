import "./calendar.scss"

import { FullPageSpinner } from "components/spinners"

import { CalendarDay } from "./calendar-day"
import { CalendarHeader } from "./calendar-header"
import { Calendar, getMonth } from "./calendar-utils"

function EventCalendar(props) {
  const { year, monthName, events, loading } = props
  const calendar = new Calendar(year, monthName)

  if (events) {
    events.forEach((evt) => calendar.addEvent(evt))
  }

  return (
    <div className="calendar-wrap">
      <CalendarHeader calendar={calendar} />
      {!calendar.hasEvents() && (
        <div className="hidden-sm-up text-center m-t-20">
          <h4>No events scheduled</h4>
        </div>
      )}
      <div className="calendar">
        <ul className="weekdays">
          <li>Sunday</li>
          <li>Monday</li>
          <li>Tuesday</li>
          <li>Wednesday</li>
          <li>Thursday</li>
          <li>Friday</li>
          <li>Saturday</li>
        </ul>
        {loading ? (
          <FullPageSpinner />
        ) : (
          calendar.weeks.map((week) => {
            return (
              <ul key={week.nbr} className="days">
                {week.days.map((day) => {
                  return <CalendarDay key={day.date.toString()} day={day} currentMonthNbr={getMonth(monthName)} />
                })}
              </ul>
            )
          })
        )}
      </div>
    </div>
  )
}

export { EventCalendar }
