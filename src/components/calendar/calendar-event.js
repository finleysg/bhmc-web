import React from "react"

import { Link } from "react-router-dom"
import * as config from "utils/app-config"

function CalendarEvent({ clubEvent }) {
  const { name, eventTypeClass, externalUrl, startTime, startType } = clubEvent

  const eventUrl = () => {
    if (clubEvent.id === config.seasonEventId) {
      return "/membership"
    } else if (clubEvent.id === config.seasonMatchPlayId) {
      return "/match-play"
    } else {
      return clubEvent.eventUrl
    }
  }

  const showStartType = startType === "Shotgun" || startType === "Tee Times"

  return (
    <React.Fragment>
      {externalUrl ? (
        <a target="_blank" rel="noreferrer" href={externalUrl}>
          <div className={`calendar-event ${eventTypeClass}`}>{name}</div>
        </a>
      ) : (
        <Link to={eventUrl()}>
          <div className={`calendar-event ${eventTypeClass}`}>
            <p>{name}</p>
            <p>
              {startTime} {showStartType && startType}
            </p>
          </div>
        </Link>
      )}
    </React.Fragment>
  )
}

export { CalendarEvent }
