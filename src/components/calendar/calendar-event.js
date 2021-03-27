import React from "react"

import { AdminLink } from "components/button/admin-buttons"
import { Link } from "react-router-dom"
import * as colors from "styles/colors"
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
        <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
          <Link to={eventUrl()}>
            <div className={`calendar-event ${eventTypeClass}`}>
              <p>{name}</p>
              <p>
                {startTime} {showStartType && startType}
              </p>
            </div>
          </Link>
          <AdminLink
            to={clubEvent.adminUrl}
            label="Event administration home"
            color={colors.teal}
          />
        </div>
      )}
    </React.Fragment>
  )
}

export { CalendarEvent }
