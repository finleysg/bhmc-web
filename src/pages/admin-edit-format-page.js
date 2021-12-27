import React from "react"

import { EventFormatAdmin } from "components/admin/event-format-admin"
import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"

function AdminEditFormatPage() {
  const { clubEvent } = useEventAdmin()

  return (
    <div className="row">
      <OverlaySpinner loading={!clubEvent?.id} />
      <div className="col-12">
        <EventFormatAdmin clubEvent={clubEvent} />
      </div>
    </div>
  )
}

export default AdminEditFormatPage
