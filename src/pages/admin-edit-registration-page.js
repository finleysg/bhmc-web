import React from "react"

import { EditRegistration } from "components/admin/edit-registration"
import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import { useParams } from "react-router-dom"

function AdminEditRegistrationPage() {
  const { eventId, registrationId } = useParams()
  const { clubEvent, loadEvent } = useEventAdmin()

  React.useEffect(() => {
    if (!Boolean(clubEvent?.id)) loadEvent(+eventId)
  }, [loadEvent, clubEvent, eventId])

  if (Boolean(clubEvent?.id)) {
    return <EditRegistration clubEvent={clubEvent} registrationId={+registrationId} />
  } else {
    return <OverlaySpinner loading={true} />
  }
}

export default AdminEditRegistrationPage
