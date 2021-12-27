import React from "react"

import SkinsReport from "components/reports/skins-report"
import { useEventAdmin } from "context/admin-context"
import { useParams } from "react-router-dom"

function SkinsReportPage() {
  const { eventId } = useParams()
  const { clubEvent } = useEventAdmin()

  return (
    <div className="col-12">
      {clubEvent && <SkinsReport eventId={eventId} clubEvent={clubEvent} />}
    </div>
  )
}

export default SkinsReportPage
