import React from "react"

import EventRegistrationAdmin from "components/admin/event-registration-admin"
import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import { useParams } from "react-router-dom"

function AdminAddPlayerPage() {
  const { eventId } = useParams()
  const { clubEvent, loadEvent } = useEventAdmin()

  React.useEffect(() => {
    if (!Boolean(clubEvent?.id)) loadEvent(+eventId)
  }, [loadEvent, clubEvent, eventId])

  if (Boolean(clubEvent?.id)) {
    return <EventRegistrationAdmin clubEvent={clubEvent} />
  } else {
    return <OverlaySpinner loading={true} />
  }
}

export default AdminAddPlayerPage
