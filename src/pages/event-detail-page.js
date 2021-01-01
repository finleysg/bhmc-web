import EventDetail from "features/events/event-detail"
import FeesAndPoints from "features/events/fees-and-points"
import { useClubEvent } from "hooks/event-hooks"
import { useNavigate, useParams } from "react-router-dom"
import * as config from "utils/app-config"

function EventDetailPage() {
  const { eventDate, eventName } = useParams()
  const clubEvent = useClubEvent({ eventDate, eventName })
  const navigate = useNavigate()

  if (clubEvent.id === config.seasonEventId) {
    navigate("/membership")
  } else if (clubEvent.id === config.seasonMatchPlayId) {
    navigate("/match-play")
  }

  return (
    <div className="content__inner">
      <div className="row">
        <div className="col-md-8">
          <EventDetail clubEvent={clubEvent} />
        </div>
        <div className="col-md-4">
          <FeesAndPoints clubEvent={clubEvent} />
        </div>
      </div>
    </div>
  )
}

export default EventDetailPage
