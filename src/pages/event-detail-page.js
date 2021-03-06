import EventRegistrationManager from "components/event-registration/event-registration-manager"
import { EventView } from "components/events/event-view"
import { OverlaySpinner } from "components/spinners"
import { parse } from "date-fns"
import { useClubEvent } from "hooks/event-hooks"
import {
  useNavigate,
  useParams,
} from "react-router-dom"
import * as config from "utils/app-config"

function EventDetailPage() {
  const { eventDate, eventName } = useParams()
  const startDate = parse(eventDate, "yyyy-MM-dd", new Date())
  const clubEvent = useClubEvent({ eventDate, eventName, season: startDate.getFullYear() })
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
      {(!isLoading && clubEvent.paymentsAreOpen) || <EventView clubEvent={clubEvent} />}
    </div>
  )
}

export default EventDetailPage
