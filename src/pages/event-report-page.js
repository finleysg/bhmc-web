import React from "react"

import EventReport from "components/reports/event-report"
import { useEventAdmin } from "context/admin-context"
import { useParams } from "react-router-dom"

function EventReportPage() {
  const { eventId } = useParams()
  const { clubEvent } = useEventAdmin()

  return (
    <div className="col-12">
      {clubEvent && <EventReport eventId={eventId} clubEvent={clubEvent} />}
    </div>
  )
}

export default EventReportPage
