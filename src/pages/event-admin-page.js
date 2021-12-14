import React from "react"

import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import { useCreateEventSlots } from "hooks/admin-hooks"
import { useEventRegistrationSlots } from "hooks/event-hooks"
import { useParams } from "react-router-dom"

function EventAdminPage() {
  const { eventId } = useParams()
  const { clubEvent, loadEvent } = useEventAdmin()
  const { mutate: createSlots, status } = useCreateEventSlots()
  const { data: slots } = useEventRegistrationSlots(eventId)

  React.useEffect(() => {
    loadEvent(+eventId)
  }, [loadEvent, eventId])

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <OverlaySpinner loading={status === "loading"} />
            <h3 className="card-title text-success">{clubEvent?.name} Administration</h3>
            <div className="card-text">
              {clubEvent?.registrationWindow === "future" && (
                <>
                  <p>
                    Currently there are {slots?.length} slots created for this event. Create or recreate registration
                    slots:
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
              <p className="mt-4">Clone this event:</p>
              <button className="btn btn-primary">Clone Event (TODO)</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventAdminPage
