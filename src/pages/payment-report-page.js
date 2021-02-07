import React from "react"

import PaymentReport from "components/reports/payment-report"
import { useClubEvent } from "hooks/event-hooks"
import { useParams } from "react-router-dom"

function PaymentReportPage() {
  const { eventId } = useParams()
  const clubEvent = useClubEvent({ eventId: +eventId })

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-success">{clubEvent.name} Event Report</h4>
        <div className="card-text">
          <PaymentReport eventId={eventId} clubEvent={clubEvent} />
        </div>
      </div>
    </div>
  )
}

export default PaymentReportPage
