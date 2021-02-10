import React from "react"

import { usePlayer } from "hooks/player-hooks"
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
  const player = usePlayer(playerId)

  React.useEffect(() => {
    if (Boolean(player.id)) {
      const isVisible = evaluateRestriction(fee, player)
      setVisible(isVisible)
    }
  }, [fee, player])

  if (visible) {
    return UnrestrictedEventFeeItem(props)
  }
  return null
}

function UnrestrictedEventFeeItem({ fee, selected, disabled, onToggleFee }) {
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

function EventFeeItem(props) {
  const { fee } = props
  if (fee.restriction === "None") {
    return UnrestrictedEventFeeItem(props)
  } else {
    return RestrictedEventFeeItem(props)
  }
}

export default EventFeeItem
