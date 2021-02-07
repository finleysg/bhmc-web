import React from "react"

import { useClubEvent } from "hooks/event-hooks"
import { Link, useParams } from "react-router-dom"

const ADMIN_BASE = process.env.REACT_APP_ADMIN_URL

function EventAdminPage() {
  const { eventId } = useParams()
  const clubEvent = useClubEvent({ eventId: +eventId })

  return (
    <div className="card" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h3 className="card-title text-success">{clubEvent.name} Administration</h3>
        <div className="card-text">
          <p>
            <a
              href={`${ADMIN_BASE}/events/event/${eventId}/change/`}
              target="_blank"
              rel="noreferrer"
            >
              Django event admin page
            </a>
          </p>
          <p>
            <Link to="event-report">Event report</Link>
          </p>
          <p>
            <Link to="payment-report">Payment report</Link>
          </p>
          <p>
            <Link to="add-player">Add a player/member</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default EventAdminPage
