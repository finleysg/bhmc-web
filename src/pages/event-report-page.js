import React from "react"

import EventReport from "components/reports/event-report"
import { useClubEvent } from "hooks/event-hooks"
import { useParams } from "react-router-dom"

function EventReportPage() {
  const { eventId } = useParams()
  const clubEvent = useClubEvent({ eventId: +eventId })

  return <EventReport eventId={eventId} clubEvent={clubEvent} />
}

export default EventReportPage
