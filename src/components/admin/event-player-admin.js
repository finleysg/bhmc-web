import React from "react"

import { useEventRegistrationSlots } from "hooks/event-hooks"
import { LoadReserveTables } from "models/reserve"

import { ReserveAdmin } from "./reserve-admin"

function EventPlayerAdmin({ clubEvent }) {
  const { data: slots } = useEventRegistrationSlots(clubEvent.id)
  const reserveTables = clubEvent.canChoose ? LoadReserveTables(clubEvent, slots) : []

  if (clubEvent.canChoose) {
    return <ReserveAdmin reserveTables={reserveTables} />
  } else {
    return null
  }
}

export default EventPlayerAdmin
