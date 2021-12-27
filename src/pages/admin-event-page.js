import React from "react"

import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import { Outlet, useParams } from "react-router-dom"

function AdminEventPage() {
  const { eventId } = useParams()
  const { loadEvent, clubEvent } = useEventAdmin()

  React.useEffect(() => {
    loadEvent(+eventId)
  }, [loadEvent, eventId])

  return (
    <div className="row">
      <OverlaySpinner loading={!clubEvent?.id} />
      <Outlet />
    </div>
  )
}

export default AdminEventPage
