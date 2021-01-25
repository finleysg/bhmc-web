import React from "react"

import { useEventRegistration } from "context/registration-context"

import { RegistrationItemRow } from "./event-registration-rows"

function RegistrationSlot({ slot, payment, eventFees, onRemovePlayer, onToggleFee, ...rest }) {
  // If there is a payment object created, has a given fee been selected?
  const hasPaymentDetail = (eventFee) => {
    if (payment && payment.details) {
      const index = payment.details.findIndex(
        (d) => d.eventFeeId === eventFee.id && d.slotId === slot.id,
      )
      return index >= 0
    }
    return false
  }

  const handleToggleFee = ({ fee }) => {
    if (hasPaymentDetail(fee)) {
      onToggleFee({ action: "remove", slot, fee })
    } else {
      onToggleFee({ action: "add", slot, fee })
    }
  }

  return eventFees.map((eventFee, index) => {
    return (
      <RegistrationItemRow
        key={eventFee.id * slot.id}
        index={index}
        slot={slot}
        fee={eventFee}
        selected={hasPaymentDetail(eventFee)}
        onRemovePlayer={onRemovePlayer}
        onToggleFee={handleToggleFee}
        {...rest}
      />
    )
  })
}

function RegistrationSlots({ eventFees, ...rest }) {
  const { registration, payment, removePlayer, addFee, removeFee } = useEventRegistration()

  const handleRemovePlayer = (slot) => {
    removePlayer(slot.playerId)
  }

  const handleToggleFee = ({ action, slot, fee }) => {
    console.log("should trigger a re-render")
    if (action === "add") {
      addFee({ eventFeeId: fee.id, slotId: slot.id })
    } else if (action === "remove") {
      removeFee({ eventFeeId: fee.id, slotId: slot.id })
    }
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
          onToggleFee={handleToggleFee}
          {...rest}
        />
      ))}
    </React.Fragment>
  )
}

export { RegistrationSlots }
