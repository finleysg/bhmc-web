import { getTeamNumber } from "models/registration"

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
  mode,
  teamSize,
  skinsType,
  ...rest
}) {
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
          mode={mode}
          payment={payment}
          eventFees={eventFees}
          onRemovePlayer={handleRemovePlayer}
          onToggleFee={handleToggleFee}
          team={getTeamNumber(slot, teamSize)}
          skinsType={skinsType}
          {...rest}
        />
      ))}
    </div>
  )
}

export default RegistrationGroup
