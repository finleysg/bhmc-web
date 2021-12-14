import { EventDocuments } from "components/document/event-documents"
import EventDetail from "components/events/event-detail"
import FeesAndPoints from "components/events/fees-and-points"
import * as config from "utils/app-config"

import EventPhotos from "./event-photos"
import SeasonEventDetail from "./season-event-detail"

function EventView({ clubEvent, hasSignedUp, isMember, openings, onRegister, onEditRegistration }) {
  const getOpenings = () => {
    if (openings === undefined && Boolean(clubEvent.id)) {
      return clubEvent.availableSpots()
    } else if (isNaN(openings)) {
      return 0
    }
    return openings
  }

  return (
    <div className="row">
      <div className="col-md-8">
        {clubEvent.id === config.seasonEventId && <SeasonEventDetail clubEvent={clubEvent} onRegister={onRegister} />}
        {clubEvent.id === config.seasonEventId || (
          <EventDetail
            clubEvent={clubEvent}
            hasSignedUp={hasSignedUp}
            isMember={isMember}
            onRegister={onRegister}
            onEditRegistration={onEditRegistration}
          />
        )}
      </div>
      <div className="col-md-4">
        <FeesAndPoints clubEvent={clubEvent} openings={getOpenings()} />
        <EventDocuments clubEvent={clubEvent} />
        <EventPhotos clubEvent={clubEvent} />
      </div>
    </div>
  )
}

export { EventView }
