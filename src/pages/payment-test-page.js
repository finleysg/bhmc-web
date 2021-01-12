import React from "react"

import { RegistrationErrorFallback } from "components/errors"
import { useEventRegistration } from "context/registration-context"
import SimpleSignupFlow from "features/event-registration/simple-signup-flow"
import TestEvent from "features/events/test-event"
import { ErrorBoundary } from "react-error-boundary"

function PaymentTestPage() {
  const eventId = 336
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
    return ""
  }, [])

  return (
    <div className="content__inner">
      <header className="content__title">
        <h1>Payment Test Event</h1>
      </header>
      <div className="row">
        <div className="col-lg-8 col-md-6 col-sm-12">
          <TestEvent />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <ErrorBoundary FallbackComponent={RegistrationErrorFallback} onReset={handleReset}>
            <SimpleSignupFlow
              feeFilter={matchPlayEventFeeFilter}
              getNotificationType={getNotificationType}
            />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default PaymentTestPage
