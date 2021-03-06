import React from "react"

import * as colors from "styles/colors"

import EventFeeItem from "./event-fee-item"
import RegistrationSlotPlayer from "./registration-slot-player"

function RegistrationSlot({
  layout,
  slot,
  mode,
  payment,
  eventFees,
  onRemovePlayer,
  onToggleFee,
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

  const handleToggleFee = ({ fee }) => {
    if (hasPaymentDetail(fee)) {
      onToggleFee({ action: "remove", slot, fee })
    } else {
      onToggleFee({ action: "add", slot, fee })
    }
  }

  return (
    <div className="slot" style={{ backgroundColor: colors.gray50 }}>
      <RegistrationSlotPlayer slot={slot} onRemovePlayer={onRemovePlayer} mode={mode} />
      <div className="fees">
        {eventFees.map((eventFee) => {
          const existing = slot.paidFeeIds.indexOf(eventFee.id) >= 0
          return (
            <EventFeeItem
              key={eventFee.id * slot.id}
              fee={eventFee}
              playerId={slot.playerId}
              selected={hasPaymentDetail(eventFee) || existing}
              disabled={slot.playerId === 0 || existing}
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
