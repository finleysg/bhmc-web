import React from "react"

import { parse } from "date-fns"
import { useClubEvents } from "hooks/event-hooks"
import { loadingEvent } from "models/club-event"
import { useParams } from "react-router-dom"
import { getClubEvent } from "utils/event-utils"

import ReservedGridPage from "./reserved-grid-page"
import ReservedListingPage from "./reserved-listing-page"

function ReservedPage() {
  const { eventDate, eventName } = useParams()
  const [clubEvent, setClubEvent] = React.useState(loadingEvent)
  const startDate = parse(eventDate, "yyyy-MM-dd", new Date())
  const clubEvents = useClubEvents(startDate.getFullYear())

  React.useEffect(() => {
    if (clubEvents && clubEvents.length > 0) {
      const evt = getClubEvent({ events: clubEvents, eventDate, eventName })
      setClubEvent(evt)
    }
  }, [clubEvents, eventDate, eventName, setClubEvent])

  if (clubEvent.canChoose) {
    return <ReservedGridPage clubEvent={clubEvent} />
  } else {
    return <ReservedListingPage clubEvent={clubEvent} />
  }
}

export default ReservedPage
