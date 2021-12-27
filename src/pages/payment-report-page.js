import React from "react"

import PaymentReport from "components/reports/payment-report"
import { useEventAdmin } from "context/admin-context"
import { useParams } from "react-router-dom"

function PaymentReportPage() {
  const { eventId } = useParams()
  const { clubEvent } = useEventAdmin()

  return (
    <div className="col-12">
      {clubEvent && <PaymentReport eventId={eventId} clubEvent={clubEvent} />}
    </div>
  )
}

export default PaymentReportPage
