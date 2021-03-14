import React from "react"

import EventPlayerAdmin from "components/admin/event-player-admin"
import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import { useParams } from "react-router-dom"

function AdminManagePlayersPage() {
  const { eventId } = useParams()
  const { clubEvent, loadEvent } = useEventAdmin()

  React.useEffect(() => {
    if (!Boolean(clubEvent?.id)) loadEvent(+eventId)
  }, [loadEvent, clubEvent, eventId])

  if (Boolean(clubEvent?.id)) {
    return <EventPlayerAdmin clubEvent={clubEvent} />
  } else {
    return <OverlaySpinner loading={true} />
  }
}

export default AdminManagePlayersPage
