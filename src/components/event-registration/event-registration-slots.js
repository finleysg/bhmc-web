import React from "react"

import { useEventRegistration } from "context/registration-context"

import { RegistrationItemRow } from "./event-registration-rows"

function RegistrationSlot({ slot, payment, eventFees, onRemovePlayer, ...rest }) {
  // If there is a payment object created, has a given fee been selected?
  const hasPaymentDetail = (eventFee) => {
    if (payment && payment.details) {
      const index = payment.details.findIndex((d) => d.eventFeeId === eventFee.id)
      return index >= 0
    }
    return false
  }

  return eventFees.map((eventFee, index) => {
    return (
      <RegistrationItemRow
        key={eventFee.id}
        index={index}
        slot={slot}
        fee={eventFee}
        selected={hasPaymentDetail(eventFee)}
        onRemovePlayer={onRemovePlayer}
        {...rest}
      />
    )
  })
}

function RegistrationSlots({ eventFees, ...rest }) {
  const { registration, payment, removePlayer } = useEventRegistration()

  const handleRemovePlayer = (slot) => {
    // TODO: fees must be removed
    removePlayer(slot.playerId)
  }

  return (
    <React.Fragment>
      {registration.slots.map((slot) => (
        <RegistrationSlot
          key={slot.id}
          slot={slot}
          payment={payment}
          eventFees={eventFees}
          onRemovePlayer={handleRemovePlayer}
          {...rest}
        />
      ))}
    </React.Fragment>
  )
}

export { RegistrationSlots }
