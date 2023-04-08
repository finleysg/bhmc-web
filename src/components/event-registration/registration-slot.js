import * as colors from "styles/colors"

import EventFeeItem from "./event-fee-item"
import RegistrationSlotPlayer from "./registration-slot-player"

function RegistrationSlot({
  slot,
  mode,
  payment,
  eventFees,
  onRemovePlayer,
  onToggleFee,
  team,
  skinsType,
  ...rest
}) {
  // If there is a payment object created, has a given fee been selected?
  const hasPaymentDetail = (eventFee) => {
    if (payment && payment.details) {
      return payment.details.some((d) => d.eventFeeId === eventFee.id && d.slotId === slot.id)
    }
    return false
  }

  const slotTotal = () => {
    const selected = eventFees.filter((f) => hasPaymentDetail(f))
    if (selected.length === 1) {
      return selected[0].amount
    }
    return selected.reduce((acc, fee) => acc + fee.amount, 0)
  }

  const handleToggleFee = ({ fee, isSelected }) => {
    if (mode === "edit") {
      onToggleFee({ action: isSelected ? "remove" : "add", slot, fee })
    } else {
      if (hasPaymentDetail(fee)) {
        onToggleFee({ action: "remove", slot, fee })
      } else {
        onToggleFee({ action: "add", slot, fee })
      }
    }
  }

  const allowTeamFee = (eventFee) => {
    if (eventFee.isSkinsFee && skinsType === "Team") {
      // only allow team fee for the first player on a team
      if (team === 1) {
        return slot.slot === 0
      } else if (team === 2) {
        return slot.slot === 2
      } else {
        return false
      }
    }
    return true // no team restriction
  }

  return (
    <div
      className="slot"
      style={{ backgroundColor: colors.gray50 }}
      data-testid="registration-slot"
    >
      <RegistrationSlotPlayer slot={slot} onRemovePlayer={onRemovePlayer} mode={mode} team={team} />
      <div className="fees">
        {eventFees.map((eventFee) => {
          const existing = slot.paidFeeIds.indexOf(eventFee.id) >= 0
          return (
            <EventFeeItem
              key={eventFee.id * slot.id}
              fee={eventFee}
              playerId={slot.playerId}
              selected={hasPaymentDetail(eventFee) || existing}
              disabled={slot.playerId === 0 || existing || !allowTeamFee(eventFee)}
              onToggleFee={handleToggleFee}
              {...rest}
            />
          )
        })}
      </div>
      <div className="subtotal">${slotTotal().toFixed(2)}</div>
    </div>
  )
}

export default RegistrationSlot
