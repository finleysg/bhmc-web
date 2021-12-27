import React from "react"

import { PortalAdmin } from "components/admin/portal-admin"
import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"

function AdminEditPortalPage() {
  const { clubEvent } = useEventAdmin()

  return (
    <div className="col-md-6 col-lg-4">
      <OverlaySpinner loading={!clubEvent?.id} />
      {clubEvent && <PortalAdmin clubEvent={clubEvent} />}
    </div>
  )
}

export default AdminEditPortalPage
