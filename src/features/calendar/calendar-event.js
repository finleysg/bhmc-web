import React from "react"

import { Link } from "react-router-dom"

function CalendarEvent({ clubEvent }) {
  const { name, eventTypeClass, externalUrl, eventUrl } = clubEvent

  return (
    <div className={`calendar-event ${eventTypeClass}`}>
      {externalUrl ? (
        <a target="_blank" rel="noreferrer" href={externalUrl}>
          {name}
        </a>
      ) : (
        <Link to={eventUrl}>{name}</Link>
      )}
    </div>
  )
}

export { CalendarEvent }
