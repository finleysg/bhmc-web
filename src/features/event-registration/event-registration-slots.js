import React from "react"

import { useEventRegistration } from "context/registration-context"
import Player from "models/player"

import { usePlayers } from "../../hooks/registration-hooks"
import { RegistrationItemRow } from "./event-registration-rows"

function RegistrationSlots(props) {
  const { registration, payment } = useEventRegistration()
  const players = usePlayers()

  // If there is a payment object created, has a given fee been selected?
  const hasPaymentDetail = (eventFee) => {
    if (payment && payment.details) {
      const index = payment.details.findIndex((d) => d.eventFeeId === eventFee.id)
      return index >= 0
    }
    return false
  }

  const findPlayer = (id) => {
    const index = players.findIndex((p) => p.id === id)
    if (index >= 0) {
      return players[index]
    }
    return new Player({})
  }

  return (
    <React.Fragment>
      {registration.slots.map((slot) =>
        props.eventFees.map((eventFee, index) => {
          return (
            <RegistrationItemRow
              key={eventFee.id}
              index={index}
              player={findPlayer(slot.playerId)}
              fee={eventFee}
              selected={hasPaymentDetail(eventFee)}
              onAdd={props.onAdd}
              onRemove={props.onRemove}
            />
          )
        }),
      )}
    </React.Fragment>
  )
}

export { RegistrationSlots }
