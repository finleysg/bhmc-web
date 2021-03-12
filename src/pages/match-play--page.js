import React from "react"

import EventRegistrationManager from "components/event-registration/event-registration-manager"
import { EventView } from "components/events/event-view"
import { OverlaySpinner } from "components/spinners"
import { useClubEvents } from "hooks/event-hooks"
import { loadingEvent } from "models/club-event"
import * as config from "utils/app-config"
import { getClubEvent } from "utils/event-utils"

function MatchPlayPage() {
  const [clubEvent, setClubEvent] = React.useState(loadingEvent)
  const clubEvents = useClubEvents(config.currentSeason)

  React.useEffect(() => {
    if (clubEvents && clubEvents.length > 0) {
      const evt = getClubEvent({ events: clubEvents, eventId: config.seasonMatchPlayId })
      setClubEvent(evt)
    }
  }, [clubEvents, setClubEvent])

  const isLoading = !Boolean(clubEvent.id)

  return (
    <div className="content__inner">
      <OverlaySpinner loading={isLoading} />
      {!isLoading && clubEvent.registrationIsOpen && (
        <EventRegistrationManager clubEvent={clubEvent} />
      )}
      {(!isLoading && clubEvent.registrationIsOpen) || <EventView clubEvent={clubEvent} />}
    </div>
  )
}

export default MatchPlayPage
