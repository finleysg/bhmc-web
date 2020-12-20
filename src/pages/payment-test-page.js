import React from "react"

import { useEventRegistration } from "context/registration-context"
import SimpleSignupFlow from "features/event-registration/simple-signup-flow"
import TestEvent from "features/events/test-event"

function PaymentTestPage() {
  const eventId = 5
  const { loadEvent } = useEventRegistration()

  React.useEffect(() => {
    loadEvent(eventId)
  }, [loadEvent, eventId])

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
          <SimpleSignupFlow
            feeFilter={matchPlayEventFeeFilter}
            getNotificationType={getNotificationType}
          />
        </div>
      </div>
    </div>
  )
}

export default PaymentTestPage
