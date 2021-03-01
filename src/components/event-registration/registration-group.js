import React from "react"

import EventFeeHeader from "./event-fee-header"
import RegistrationSlot from "./registration-slot"

function RegistrationGroup({
  eventFees,
  layout,
  registration,
  payment,
  removePlayer,
  addFee,
  removeFee,
  ...rest
}) {
  // const { registration, payment, removePlayer, addFee, removeFee } = useEventRegistration()

  const handleRemovePlayer = (slot) => {
    removePlayer(slot)
  }

  const handleToggleFee = ({ action, slot, fee }) => {
    if (action === "add") {
      addFee({ eventFeeId: fee.id, slotId: slot.id })
    } else if (action === "remove") {
      removeFee({ eventFeeId: fee.id, slotId: slot.id })
    }
  }

  return (
    <div className={layout === "horizontal" ? "hgroup" : "vgroup"}>
      {layout === "horizontal" && <EventFeeHeader eventFees={eventFees} />}
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
    </div>
  )
}

export default RegistrationGroup
