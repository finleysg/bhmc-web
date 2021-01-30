import React from "react"

import EventFeeCheckbox from "./event-fee-checkbox"

function EventFeeItem({ fee, selected, disabled, onToggleFee }) {
  return (
    <div className="fee">
      <div className="fee-item fee-item--select">
        <EventFeeCheckbox
          isRequired={fee.isRequired}
          isSelected={selected}
          onChange={() => onToggleFee({ fee })}
          disabled={disabled || fee.isRequired}
        />
      </div>
      <div className="fee-item fee-item--description">
        {fee.name} (${fee.amount})
      </div>
      <div className="fee-item fee-item--amount">${selected ? fee.amount.toFixed(2) : "0.00"}</div>
    </div>
  )
}

export default EventFeeItem
