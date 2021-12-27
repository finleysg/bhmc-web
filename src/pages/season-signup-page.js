import React from "react"

import EventRegistrationManager from "components/event-registration/event-registration-manager"
import { EventView } from "components/events/event-view"
import { OverlaySpinner } from "components/spinners"
import { useClubEvents } from "hooks/event-hooks"
import { useSettings } from "hooks/use-settings"
import { loadingEvent } from "models/club-event"
import { getClubEvent } from "utils/event-utils"

function SeasonSignupPage() {
  const { currentSeason, seasonEventId } = useSettings()
  const [clubEvent, setClubEvent] = React.useState(loadingEvent)
  const clubEvents = useClubEvents(currentSeason)

  React.useLayoutEffect(() => {
    if (clubEvents && clubEvents.length > 0) {
      const evt = getClubEvent({ events: clubEvents, eventId: seasonEventId })
      setClubEvent(evt)
    }
  }, [clubEvents, setClubEvent])

  const isLoading = !clubEvent.id

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

export default SeasonSignupPage
