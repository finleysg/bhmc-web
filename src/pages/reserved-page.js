import React from "react"

import { parse } from "date-fns"
import { useClubEvent } from "hooks/event-hooks"
import { useParams } from "react-router-dom"

import ReservedGridPage from "./reserved-grid-page"
import ReservedListingPage from "./reserved-listing-page"

function ReservedPage() {
  const { eventDate, eventName } = useParams()
  const startDate = parse(eventDate, "yyyy-MM-dd", new Date())
  const clubEvent = useClubEvent({ eventDate, eventName, season: startDate.getFullYear() })

  if (clubEvent.canChoose) {
    return <ReservedGridPage clubEvent={clubEvent} />
  } else {
    return <ReservedListingPage clubEvent={clubEvent} />
  }
}

export default ReservedPage
