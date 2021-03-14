import React from "react"

import EventRegistrationManager from "components/event-registration/event-registration-manager"
import { EventView } from "components/events/event-view"
import { OverlaySpinner } from "components/spinners"
import { parse } from "date-fns"
import { useRegistrationStatus } from "hooks/account-hooks"
import { useClubEvents } from "hooks/event-hooks"
import { loadingEvent } from "models/club-event"
import {
  useNavigate,
  useParams,
} from "react-router-dom"
import * as config from "utils/app-config"
import { getClubEvent } from "utils/event-utils"

function EventDetailPage() {
  const { eventDate, eventName } = useParams()
  const [clubEvent, setClubEvent] = React.useState(loadingEvent)
  const startDate = parse(eventDate, "yyyy-MM-dd", new Date())
  const clubEvents = useClubEvents(startDate.getFullYear())
  const hasSignedUp = useRegistrationStatus(clubEvent.id)
  const isMember = useRegistrationStatus(config.seasonEventId)

  React.useEffect(() => {
    if (clubEvents && clubEvents.length > 0) {
      const evt = getClubEvent({ events: clubEvents, eventDate, eventName })
      setClubEvent(evt)
    }
  }, [clubEvents, eventDate, eventName, setClubEvent])

  const navigate = useNavigate()
  const isLoading = !Boolean(clubEvent.id)

  if (clubEvent.id === config.seasonEventId) {
    navigate("/membership")
  } else if (clubEvent.id === config.seasonMatchPlayId) {
    navigate("/match-play")
  }

  return (
    <div className="content__inner">
      <OverlaySpinner loading={isLoading} />
      {!isLoading && clubEvent.paymentsAreOpen && (
        <EventRegistrationManager clubEvent={clubEvent} />
      )}
      {(!isLoading && clubEvent.paymentsAreOpen) || (
        <EventView clubEvent={clubEvent} hasSignedUp={hasSignedUp} isMember={isMember} />
      )}
    </div>
  )
}

export default EventDetailPage
