import React from "react"

import EventRegistrationManager from "components/event-registration/event-registration-manager"
import { EventView } from "components/events/event-view"
import { OverlaySpinner } from "components/spinners"
import { useClubEvent } from "hooks/event-hooks"
import * as config from "utils/app-config"

function MatchPlayPage() {
  const clubEvent = useClubEvent({ eventId: config.seasonMatchPlayId })
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
