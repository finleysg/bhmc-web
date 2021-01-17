import React from "react"

import { format } from "date-fns"
import { usePlayer } from "hooks/account-hooks"
import { useClubEvents, usePlayerRegistrations } from "hooks/event-hooks"
import { Link } from "react-router-dom"
import * as config from "utils/app-config"

function EventView({ eventRegistration, ...rest }) {
  const eventUrl = () => {
    if (eventRegistration.id === config.seasonEventId) {
      return "/membership"
    } else if (eventRegistration.id === config.seasonMatchPlayId) {
      return "/match-play"
    } else {
      return eventRegistration.eventUrl
    }
  }

  return (
    <Link to={eventUrl()}>
      <div
        style={{
          border: "1px solid #495057",
          padding: "5px",
          margin: "5px",
        }}
        {...rest}
      >
        <p style={{ margin: 0, padding: "5px 0", fontWeight: "bold" }}>
          <span>{format(eventRegistration.startDate, "MMM d, yyyy")}:</span>{" "}
          <span className="text-success">{eventRegistration.name}</span>
        </p>
        <p className="text-muted" style={{ fontSize: ".8rem", margin: 0 }}>
          Signed up by {eventRegistration.signedUpBy} on{" "}
          {format(eventRegistration.signupDate, "MM/dd/yyyy h:mm aaaa")}
        </p>
      </div>
    </Link>
  )
}

function MyEvents() {
  const events = useClubEvents()
  const player = usePlayer()
  const registrations = usePlayerRegistrations(player?.id)

  const eventList = () => {
    if (events.length > 0 && registrations) {
      return registrations.map((r) => {
        const clubEvent = events.find((e) => e.id === r.eventId)
        if (clubEvent) {
          return {
            id: clubEvent.id,
            name: clubEvent.name,
            startDate: clubEvent.startDate,
            eventUrl: clubEvent.eventUrl,
            signedUpBy: r.signedUpBy,
            signupDate: r.createdDate,
          }
        }
        return undefined
      })
    }
    return []
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">My Events</h4>
        {/* <LoadingSpinner loading={isLoading} /> */}
        <div className="card-text">
          <div className="row" style={{ padding: "6px 0" }}>
            <div className="col-12">
              {eventList()
                .filter((e) => e)
                .map((evt) => {
                  return <EventView key={evt.id} eventRegistration={evt} />
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyEvents
