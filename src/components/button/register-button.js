import React from "react"

import { RegistrationSteps } from "context/registration-context"
import { usePlayer } from "hooks/account-hooks"

function RegisterButton({ clubEvent, hasSignedUp, isMember, currentStep, onClick, ...rest }) {
  const [canRegister, setCanRegister] = React.useState(false)
  const player = usePlayer()

  React.useEffect(() => {
    if (!Boolean(player.id)) {
      setCanRegister(false)
    } else if (hasSignedUp) {
      setCanRegister(false)
    } else if (clubEvent?.registrationTypeCode === "N") {
      setCanRegister(false)
    } else if (!clubEvent?.registrationIsOpen) {
      setCanRegister(false)
    } else if (clubEvent.registrationTypeCode !== "O" && !isMember) {
      setCanRegister(false)
    } else if (clubEvent.ghinRequired && !Boolean(player.ghin)) {
      setCanRegister(false)
    } else {
      setCanRegister(true)
    }
  }, [clubEvent, player, isMember, hasSignedUp])

  if (canRegister) {
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
  return null
}

export { RegisterButton }
