import React from "react"

import { usePlayerSearch } from "hooks/player-hooks"
import * as config from "utils/app-config"

import EventFeeCheckbox from "./event-fee-checkbox"

const evaluateRestriction = (fee, player) => {
  switch (fee.restriction) {
    case "Seniors":
      return player.age >= config.seniorRateAge
    case "Non-Seniors":
      return isNaN(player.age) || player.age < config.seniorRateAge
    case "New Members":
      return !player.isReturningMember
    case "Returning Members":
      return player.isReturningMember
    case "Members":
      return player.isMember
    default:
      return false
  }
}

function RestrictedEventFeeItem(props) {
  const { playerId, fee } = props
  const [visible, setVisible] = React.useState(false)
  const player = usePlayerSearch(fee.eventId, playerId)

  React.useEffect(() => {
    if (player.id) {
      const isVisible = evaluateRestriction(fee, player)
      setVisible(isVisible)
    }
  }, [fee, player])

  if (visible) {
    return UnrestrictedEventFeeItem(props)
  }
  return null
}

function UnrestrictedEventFeeItem({ fee, mode, selected, disabled, onToggleFee }) {
  const isSelected = selected || fee.isRequired
  return (
    <div className="fee">
      <div className="fee-item fee-item--select">
        <EventFeeCheckbox
          isRequired={fee.isRequired}
          isSelected={isSelected}
          onChange={() => onToggleFee({ fee, isSelected })}
          disabled={(mode !== "edit" && disabled) || fee.isRequired}
        />
      </div>
      <div className="fee-item fee-item--description">
        {fee.name} (${fee.amount})
      </div>
      <div className="fee-item fee-item--amount">${selected ? fee.amount.toFixed(2) : "0.00"}</div>
    </div>
  )
}

function EventFeeItem(props) {
  const { fee, mode } = props
  if (fee.restriction === "None" || mode === "edit") {
    return UnrestrictedEventFeeItem(props)
  } else {
    return RestrictedEventFeeItem(props)
  }
}

export default EventFeeItem
