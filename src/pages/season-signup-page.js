import React from "react"

import { useEventRegistration } from "context/registration-context"
import SimpleSignupFlow from "features/event-registration/simple-signup-flow"
import SeasonEvent from "features/events/season-event"
import { useMyEvents, usePlayer } from "hooks/account-hooks"
import * as config from "utils/app-config"

function SeasonSignupPage() {
  const eventId = config.seasonEventId
  const player = usePlayer()
  const myEvents = useMyEvents()
  const { loadEvent } = useEventRegistration()

  React.useEffect(() => {
    loadEvent(eventId)
  }, [loadEvent, eventId])

  const isReturning = myEvents?.indexOf(config.previousSeasonEventId)

  const seasonEventFeeFilter = React.useCallback(
    (fee) => {
      const duesCode = isReturning >= 0 ? "RMD" : "NMD"
      // TODO: adjust if rate applies for turning NN at any time this season.
      const patronCode = player.age >= config.seniorRateAge ? "SPC" : "PC"
      return fee.code === duesCode || fee.code === patronCode
    },
    [isReturning, player],
  )

  const getNotificationType = React.useCallback(() => {
    return isReturning ? "R" : "N"
  }, [isReturning])

  return (
    <div className="content__inner">
      <header className="content__title">
        <h1>{config.currentSeason} Season Registration</h1>
      </header>
      <div className="row">
        <div className="col-lg-6">
          <SeasonEvent />
        </div>
        <div className="col-lg-6">
          <SimpleSignupFlow
            feeFilter={seasonEventFeeFilter}
            getNotificationType={getNotificationType}
          />
        </div>
      </div>
    </div>
  )
}

export default SeasonSignupPage
