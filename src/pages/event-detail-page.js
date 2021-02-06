import { EventDocuments } from "components/document/event-documents"
import EventDetail from "components/events/event-detail"
import FeesAndPoints from "components/events/fees-and-points"
import { parse } from "date-fns"
import { useClubEvent } from "hooks/event-hooks"
import { useNavigate, useParams } from "react-router-dom"
import * as config from "utils/app-config"

function EventDetailPage() {
  const { eventDate, eventName } = useParams()
  const startDate = parse(eventDate, "yyyy-MM-dd", new Date())
  const clubEvent = useClubEvent({ eventDate, eventName, season: startDate.getFullYear() })
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
          <EventDocuments clubEvent={clubEvent} />
        </div>
      </div>
    </div>
  )
}

export default EventDetailPage
