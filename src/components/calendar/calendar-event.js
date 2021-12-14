import styled from "@emotion/styled/macro"

import React from "react"

import { AdminLink } from "components/button/admin-buttons"
import { Link } from "react-router-dom"
import * as colors from "styles/colors"
import * as config from "utils/app-config"

const EventContainer = styled.div({
  position: "relative",
  display: "inline-block",
  width: "100%",
})

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
        <EventContainer className={clubEvent.status === "Canceled" ? "canceled" : ""}>
          <Link to={eventUrl()}>
            <div className={`calendar-event ${eventTypeClass} ${clubEvent.status.toLowerCase()}`}>
              <p>{name}</p>
              <p>
                {startTime} {showStartType && startType}
              </p>
            </div>
          </Link>
          <AdminLink to={clubEvent.adminUrl} label="Event administration home" color={colors.teal} />
        </EventContainer>
      )}
    </React.Fragment>
  )
}

export { CalendarEvent }
