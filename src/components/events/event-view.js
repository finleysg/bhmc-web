import { EventDocuments } from "components/document/event-documents"
import EventDetail from "components/events/event-detail"
import FeesAndPoints from "components/events/fees-and-points"
import * as config from "utils/app-config"

import SeasonEventDetail from "./season-event-detail"

function EventView({ clubEvent, onRegister }) {
  return (
    <div className="row">
      <div className="col-md-8">
        {clubEvent.id === config.seasonEventId && (
          <SeasonEventDetail clubEvent={clubEvent} onRegister={onRegister} />
        )}
        {clubEvent.id === config.seasonEventId || (
          <EventDetail clubEvent={clubEvent} onRegister={onRegister} />
        )}
      </div>
      <div className="col-md-4">
        <FeesAndPoints clubEvent={clubEvent} />
        <EventDocuments clubEvent={clubEvent} />
      </div>
    </div>
  )
}

export { EventView }
