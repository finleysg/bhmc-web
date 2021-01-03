import * as Sentry from "@sentry/react"

import React from "react"

import { RegistrationErrorFallback } from "components/errors"
import { useEventRegistration } from "context/registration-context"
import SimpleSignupFlow from "features/event-registration/simple-signup-flow"
import MatchPlayEvent from "features/events/match-play-event"
import * as config from "utils/app-config"

function MatchPlaySignupPage() {
  const eventId = config.seasonMatchPlayId
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

  const matchPlayEventFeeFilter = React.useCallback(() => {
    return true
  }, [])

  const getNotificationType = React.useCallback(() => {
    return "M"
  }, [])

  return (
    <div className="content__inner">
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <MatchPlayEvent />
        </div>
        <div className="col-lg-6 col-md-12">
          <Sentry.ErrorBoundary fallback={RegistrationErrorFallback} onReset={handleReset}>
            <SimpleSignupFlow
              feeFilter={matchPlayEventFeeFilter}
              getNotificationType={getNotificationType}
            />
          </Sentry.ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default MatchPlaySignupPage
