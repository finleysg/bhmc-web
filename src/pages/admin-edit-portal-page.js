import React from "react"

import { PortalAdmin } from "components/admin/portal-admin"
import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import { useParams } from "react-router-dom"

function AdminEditPortalPage() {
  const { eventId } = useParams()
  const { clubEvent, loadEvent } = useEventAdmin()

  React.useEffect(() => {
    if (!clubEvent?.id) loadEvent(+eventId)
  }, [loadEvent, clubEvent, eventId])

  return (
    <div className="row">
      <OverlaySpinner loading={!clubEvent?.id} />
      <div className="col-md-6 col-lg-4">
        <PortalAdmin clubEvent={clubEvent} />
      </div>
    </div>
  )
}

export default AdminEditPortalPage
