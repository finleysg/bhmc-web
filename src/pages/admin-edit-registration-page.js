import React from "react"

import { RegisterAdmin } from "components/admin/register-admin"
import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import { useNavigate, useParams } from "react-router-dom"

function AdminEditRegistrationPage() {
  const navigate = useNavigate()
  const { eventId, registrationId } = useParams()
  const { clubEvent, loadEvent, loadRegistration } = useEventAdmin()

  React.useEffect(() => {
    if (!clubEvent?.id) loadEvent(+eventId)
  }, [loadEvent, clubEvent, eventId])

  React.useEffect(() => {
    loadRegistration(registrationId)
  }, [loadRegistration, registrationId])

  const handleCancel = () => {
    navigate(-1)
  }

  if (clubEvent?.id) {
    return <RegisterAdmin clubEvent={clubEvent} registrationId={+registrationId} mode="edit" onCancel={handleCancel} />
  } else {
    return <OverlaySpinner loading={true} />
  }
}

export default AdminEditRegistrationPage
