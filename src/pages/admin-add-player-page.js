import React from "react"

import EventRegistrationAdmin from "components/admin/event-registration-admin"
import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"

function AdminAddPlayerPage() {
  const { clubEvent } = useEventAdmin()

  return (
    <div className="col-12">
      <OverlaySpinner loading={!clubEvent?.id} />
      {clubEvent && <EventRegistrationAdmin clubEvent={clubEvent} />}
    </div>
  )
}

export default AdminAddPlayerPage
