import React from "react"

import { useEventRegistration } from "context/registration-context"
import SimpleSignupFlow from "features/event-registration/simple-signup-flow"
import MatchPlayEvent from "features/events/match-play-event"
import * as config from "utils/app-config"

function MatchPlaySignupPage() {
  const eventId = config.seasonMatchPlayId
  const { loadEvent } = useEventRegistration()

  React.useEffect(() => {
    loadEvent(eventId)
  }, [loadEvent, eventId])

  const matchPlayEventFeeFilter = React.useCallback(() => {
    return true
  }, [])

  const getNotificationType = React.useCallback(() => {
    return "M"
  }, [])

  return (
    <div className="content__inner">
      <header className="content__title">
        <h1>{config.currentSeason} Season Long Match Play</h1>
      </header>
      <div className="row">
        <div className="col-lg-8 col-md-6 col-sm-12">
          <MatchPlayEvent />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <SimpleSignupFlow
            feeFilter={matchPlayEventFeeFilter}
            getNotificationType={getNotificationType}
          />
        </div>
      </div>
    </div>
  )
}

export default MatchPlaySignupPage
