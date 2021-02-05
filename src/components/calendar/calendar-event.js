import React from "react"

import { Link } from "react-router-dom"
import * as config from "utils/app-config"

function CalendarEvent({ clubEvent }) {
  const { name, eventTypeClass, externalUrl } = clubEvent

  const eventUrl = () => {
    if (clubEvent.id === config.seasonEventId) {
      return "/membership"
    } else if (clubEvent.id === config.seasonMatchPlayId) {
      return "/match-play"
    } else {
      return clubEvent.eventUrl
    }
  }

  return (
    <React.Fragment>
      {externalUrl ? (
        <a target="_blank" rel="noreferrer" href={externalUrl}>
          <div className={`calendar-event ${eventTypeClass}`}>{name}</div>
        </a>
      ) : (
        <Link to={eventUrl()}>
          <div className={`calendar-event ${eventTypeClass}`}>{name}</div>
        </Link>
      )}
    </React.Fragment>
  )
}

export { CalendarEvent }