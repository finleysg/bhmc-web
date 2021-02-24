import React from "react"

import { ReservedList } from "components/reserve/reserved"
import { useEventRegistrations } from "hooks/event-hooks"

function ReservedListingPage({ clubEvent }) {
  const registrations = useEventRegistrations(clubEvent.id)

  return (
    <div className="content__inner">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-primary">{clubEvent.name}</h3>
          <div className="card-text">
            <div className="row">
              <ReservedList registrations={registrations} sortBy="player" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservedListingPage
