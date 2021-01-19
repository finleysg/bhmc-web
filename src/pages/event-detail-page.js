import EventRegistrationManager from "components/event-registration/event-registration-manager"
import { EventView } from "components/events/event-view"
import { parseISO } from "date-fns"
import { useClubEvent } from "hooks/event-hooks"
import { useNavigate, useParams } from "react-router-dom"
import * as config from "utils/app-config"

function EventDetailPage() {
  const { eventDate, eventName } = useParams()
  const startDate = parseISO(eventDate)
  const clubEvent = useClubEvent({ eventDate, eventName, season: startDate.getFullYear() })
  const navigate = useNavigate()

  if (clubEvent.id === config.seasonEventId) {
    navigate("/membership")
  } else if (clubEvent.id === config.seasonMatchPlayId) {
    navigate("/match-play")
  }

  return (
    <div className="content__inner">
      {clubEvent.registrationIsOpen ? (
        <EventRegistrationManager clubEvent={clubEvent} />
      ) : (
        <EventView clubEvent={clubEvent} />
      )}
    </div>
  )
}

export default EventDetailPage
