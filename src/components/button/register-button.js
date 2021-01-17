import React from "react"

import { RegistrationSteps } from "context/registration-context"
import { usePlayer, useRegistrationStatus } from "hooks/account-hooks"
import * as config from "utils/app-config"

function RegisterButton({ clubEvent, currentStep, onClick, ...rest }) {
  const player = usePlayer()
  const isMember = useRegistrationStatus(config.seasonEventId)
  const hasSignedUp = useRegistrationStatus(clubEvent?.id)

  // short circuit cases
  if (!Boolean(player.id)) {
    return null
  } else if (hasSignedUp) {
    return null
  } else if (clubEvent?.registrationTypeCode === "N") {
    return null
  } else if (!clubEvent?.registrationIsOpen) {
    return null
  } else if (clubEvent.registrationTypeCode !== "O" && !isMember) {
    return null
  } else if (clubEvent.ghinRequired && !Boolean(player.ghin)) {
    return null
  }

  return (
    <button
      className="btn btn-warning btn-sm"
      disabled={currentStep !== RegistrationSteps.Pending}
      onClick={onClick}
      {...rest}
    >
      🖊️ Sign Up Now
    </button>
  )
}

export { RegisterButton }
