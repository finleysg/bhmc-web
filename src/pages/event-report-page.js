import React from "react"

import EventReport from "components/reports/event-report"
import { useClubEvents } from "hooks/event-hooks"
import { loadingEvent } from "models/club-event"
import { useParams } from "react-router-dom"
import * as config from "utils/app-config"
import { getClubEvent } from "utils/event-utils"

// TODO: this won't work for a previous year's event
function EventReportPage() {
  const { eventId } = useParams()
  const [clubEvent, setClubEvent] = React.useState(loadingEvent)
  const clubEvents = useClubEvents(config.currentSeason)

  React.useEffect(() => {
    if (clubEvents && clubEvents.length > 0) {
      const evt = getClubEvent({ events: clubEvents, eventId: +eventId })
      setClubEvent(evt)
    }
  }, [clubEvents, setClubEvent, eventId])

  return <EventReport eventId={eventId} clubEvent={clubEvent} />
}

export default EventReportPage
