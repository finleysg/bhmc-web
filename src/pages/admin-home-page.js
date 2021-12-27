import React from "react"

import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import { useCreateEventSlots } from "hooks/admin-hooks"
import { useEventRegistrationSlots } from "hooks/event-hooks"
import { useParams } from "react-router-dom"

function AdminHomePage() {
  const { eventId } = useParams()
  const { clubEvent } = useEventAdmin()
  const { mutate: createSlots, status } = useCreateEventSlots()
  const { data: slots } = useEventRegistrationSlots(eventId)

  return (
    <div className="col-md-6">
      <div className="card">
        <div className="card-body">
          <OverlaySpinner loading={status === "loading"} />
          <h3 className="card-title text-success">{clubEvent?.name} Administration</h3>
          <div className="card-text">
            {clubEvent?.registrationWindow === "future" && (
              <>
                <p>
                  Currently there are {slots?.length} slots created for this event. Create or
                  recreate registration slots:
                </p>
                <button
                  className="btn btn-primary"
                  disabled={status === "loading"}
                  onClick={() => createSlots(eventId)}
                >
                  Create Slots
                </button>
              </>
            )}
            {clubEvent?.registrationWindow === "future" || <p>This event has been completed.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHomePage
