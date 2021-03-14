import React from "react"

import { EventFormatAdmin } from "components/admin/event-format-admin"
import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import { useParams } from "react-router-dom"

function AdminEditFormatPage() {
  const { eventId } = useParams()
  const { clubEvent, loadEvent } = useEventAdmin()

  React.useEffect(() => {
    if (!Boolean(clubEvent?.id)) loadEvent(+eventId)
  }, [loadEvent, clubEvent, eventId])

  return (
    <div className="row">
      <OverlaySpinner loading={!Boolean(clubEvent?.id)} />
      <div className="col-12">
        <EventFormatAdmin clubEvent={clubEvent} />
      </div>
    </div>
  )
}

export default AdminEditFormatPage
