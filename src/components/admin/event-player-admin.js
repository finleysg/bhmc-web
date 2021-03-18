import React from "react"

import { useEventRegistrationSlots } from "hooks/event-hooks"
import { LoadReserveTables } from "models/reserve"

import { RegisteredAdmin } from "./registered-admin"
import { ReserveAdmin } from "./reserve-admin"

function EventPlayerAdmin({ clubEvent }) {
  const { data: slots } = useEventRegistrationSlots(clubEvent.id)
  const reserveTables = clubEvent.canChoose ? LoadReserveTables(clubEvent, slots) : []

  if (clubEvent.canChoose) {
    return (
      <div className="row">
        <div className="col-12">
          <ReserveAdmin clubEvent={clubEvent} reserveTables={reserveTables} />
        </div>
      </div>
    )
  } else {
    return <RegisteredAdmin clubEvent={clubEvent} />
  }
}

export default EventPlayerAdmin
