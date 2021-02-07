import React from "react"

import EventReport from "components/reports/event-report"
import { useClubEvent } from "hooks/event-hooks"
import { useParams } from "react-router-dom"

function EventReportPage() {
  const { eventId } = useParams()
  const clubEvent = useClubEvent({ eventId: +eventId })

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-success">{clubEvent.name} Event Report</h4>
        <div className="card-text">
          <EventReport eventId={eventId} clubEvent={clubEvent} />
        </div>
      </div>
    </div>
  )
}

export default EventReportPage
