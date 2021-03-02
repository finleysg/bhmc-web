import React from "react"

import PaymentReport from "components/reports/payment-report"
import { useClubEvent } from "hooks/event-hooks"
import { useParams } from "react-router-dom"

function PaymentReportPage() {
  const { eventId } = useParams()
  const clubEvent = useClubEvent({ eventId: +eventId })

  return <PaymentReport eventId={eventId} clubEvent={clubEvent} />
}

export default PaymentReportPage
