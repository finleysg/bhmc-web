import React from "react"

import { useEventAdmin } from "context/admin-context"
import { useParams } from "react-router-dom"

function EventAdminPage() {
  const { eventId } = useParams()
  const { clubEvent, loadEvent } = useEventAdmin()

  React.useEffect(() => {
    loadEvent(+eventId)
  }, [loadEvent, eventId])

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-success">{clubEvent?.name} Administration</h3>
            <div className="card-text">
              <p>Manage this event with the options from the menu.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventAdminPage
