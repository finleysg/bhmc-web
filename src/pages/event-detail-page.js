import React from "react"

import EventRegistrationManager from "components/event-registration/event-registration-manager"
import { EventView } from "components/events/event-view"
import { OverlaySpinner } from "components/spinners"
import { parse } from "date-fns"
import { useRegistrationStatus } from "hooks/account-hooks"
import { useClubEvents, useEventRegistrationSlots } from "hooks/event-hooks"
import { useSettings } from "hooks/use-settings"
import { loadingEvent } from "models/club-event"
import { useNavigate, useParams } from "react-router-dom"
import { getClubEvent } from "utils/event-utils"

function EventDetailPage() {
  const { seasonEventId, seasonMatchPlayId } = useSettings()
  const { eventDate, eventName } = useParams()
  const [clubEvent, setClubEvent] = React.useState(loadingEvent)
  const [openings, setOpenings] = React.useState(0)
  const startDate = parse(eventDate, "yyyy-MM-dd", new Date())
  const clubEvents = useClubEvents(startDate.getFullYear())
  const hasSignedUp = useRegistrationStatus(clubEvent.id)
  const isMember = useRegistrationStatus(seasonEventId)
  const { data: slots } = useEventRegistrationSlots(clubEvent.id)

  React.useEffect(() => {
    if (clubEvents && clubEvents.length > 0) {
      const evt = getClubEvent({ events: clubEvents, eventDate, eventName })
      setClubEvent(evt)
      if (evt.canChoose) {
        const filled = slots?.filter((s) => s.status !== "A")?.length ?? 0
        setOpenings(slots?.length - filled)
      } else {
        setOpenings(evt.registrationMaximum)
      }
    }
  }, [clubEvents, eventDate, eventName, setClubEvent, setOpenings, slots])

  const navigate = useNavigate()
  const isLoading = !clubEvent.id

  if (clubEvent.id !== 0) {
    if (clubEvent.id === seasonEventId) {
      navigate("/membership")
    } else if (clubEvent.id === seasonMatchPlayId) {
      navigate("/match-play")
    }
  }

  return (
    <div className="content__inner">
      <OverlaySpinner loading={isLoading} />
      {!isLoading && clubEvent.paymentsAreOpen && (
        <EventRegistrationManager clubEvent={clubEvent} />
      )}
      {(!isLoading && clubEvent.paymentsAreOpen) || (
        <EventView
          clubEvent={clubEvent}
          hasSignedUp={hasSignedUp}
          isMember={isMember}
          openings={openings}
        />
      )}
    </div>
  )
}

export default EventDetailPage
