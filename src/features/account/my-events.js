import React from "react"

import { LoadingSpinner } from "components/spinners"
import { format } from "date-fns"
import { useMyEvents } from "hooks/account-hooks"
import { useClubEvents } from "hooks/event-hooks"

function MyEvents() {
  const { data: clubEvents, isLoading } = useClubEvents()
  const myEvents = useMyEvents()

  const eventList = clubEvents?.filter((evt) => myEvents?.indexOf(evt.id) >= 0)

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">My Events</h4>
        <LoadingSpinner loading={isLoading} />
        <div className="card-text">
          {eventList &&
            eventList.map((evt) => {
              return (
                <div className="row" style={{ padding: "6px 0" }} key={evt.id}>
                  <div className="col-12">
                    <h6>
                      {evt.name}{" "}
                      <small className="text-muted">
                        ({format(evt.startDate, "MMMM d, yyyy")})
                      </small>
                    </h6>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default MyEvents
