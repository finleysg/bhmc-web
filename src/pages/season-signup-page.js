import * as Sentry from "@sentry/react"

import React from "react"

import { RegistrationErrorFallback } from "components/errors"
import { useEventRegistration } from "context/registration-context"
import SimpleSignupFlow from "features/event-registration/simple-signup-flow"
import SeasonEvent from "features/events/season-event"
import { usePlayer, useRegistrationStatus } from "hooks/account-hooks"
import * as config from "utils/app-config"

function SeasonSignupPage() {
  const eventId = config.seasonEventId
  const player = usePlayer()
  const isReturning = useRegistrationStatus(config.previousSeasonEventId)
  const { loadEvent, cancelRegistration, registration } = useEventRegistration()

  React.useEffect(() => {
    loadEvent(eventId)
  }, [loadEvent, eventId])

  const handleReset = () => {
    if (registration && registration.id) {
      cancelRegistration(registration.id)
    }
    window.location.assign(window.location)
  }

  const seasonEventFeeFilter = React.useCallback(
    (fee) => {
      const duesCode = isReturning ? "RMD" : "NMD"
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
      <div className="row">
        <div className="col-lg-6">
          <SeasonEvent returningMember={isReturning} />
        </div>
        <div className="col-lg-6">
          <Sentry.ErrorBoundary
            fallback={<RegistrationErrorFallback resetErrorBoundary={handleReset} />}
          >
            <SimpleSignupFlow
              feeFilter={seasonEventFeeFilter}
              getNotificationType={getNotificationType}
            />
          </Sentry.ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default SeasonSignupPage
