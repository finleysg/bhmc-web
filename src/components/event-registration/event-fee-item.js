import React from "react"

import { usePlayer, usePlayerEvents } from "hooks/player-hooks"
import * as config from "utils/app-config"

import EventFeeCheckbox from "./event-fee-checkbox"

const evaluateRestriction = (fee, player, playerEvents) => {
  switch (fee.restriction) {
    case "Seniors":
      return player.age >= config.seniorRateAge
    case "Non-Seniors":
      return player.age < config.seniorRateAge
    case "New Members":
      return playerEvents.indexOf(config.previousSeasonEventId) < 0
    case "Returning Members":
      return playerEvents.indexOf(config.previousSeasonEventId) >= 0
    case "Members":
      return playerEvents.indexOf(config.seasonEventId) >= 0
    default:
      return false
  }
}

function RestrictedEventFeeItem(props) {
  const { playerId, fee } = props
  const [visible, setVisible] = React.useState(false)
  const player = usePlayer(playerId)
  const playerEvents = usePlayerEvents(playerId)

  React.useEffect(() => {
    if (Boolean(player.id) && Boolean(playerEvents)) {
      const isVisible = evaluateRestriction(fee, player, playerEvents)
      setVisible(isVisible)
    }
  }, [fee, player, playerEvents])

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
