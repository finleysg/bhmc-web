import { EventDocuments } from "components/document/event-documents"
import EventDetail from "components/events/event-detail"
import FeesAndPoints from "components/events/fees-and-points"

function EventView({ clubEvent, onRegister }) {
  return (
    <div className="row">
      <div className="col-md-8">
        <EventDetail clubEvent={clubEvent} onRegister={onRegister} />
      </div>
      <div className="col-md-4">
        <FeesAndPoints clubEvent={clubEvent} />
        <EventDocuments clubEvent={clubEvent} />
      </div>
    </div>
  )
}

export { EventView }
