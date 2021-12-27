import React from "react"

import EventPlayerAdmin from "components/admin/event-player-admin"
import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"

function AdminManagePlayersPage() {
  const { clubEvent } = useEventAdmin()

  return (
    <div className="col-12">
      <OverlaySpinner loading={!clubEvent?.id} />
      {clubEvent && <EventPlayerAdmin clubEvent={clubEvent} />}
    </div>
  )
}

export default AdminManagePlayersPage
