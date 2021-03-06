import React from "react"

import { RegistrationSteps } from "context/registration-context"
import { useRegistrationStatus } from "hooks/account-hooks"

function EditRegistrationButton({ clubEvent, currentStep, onClick, ...rest }) {
  const hasSignedUp = useRegistrationStatus(clubEvent?.id)

  if (hasSignedUp && clubEvent?.paymentsAreOpen) {
    return (
      <button
        className="btn btn-success btn-sm"
        disabled={currentStep !== RegistrationSteps.Pending}
        onClick={onClick}
        {...rest}
      >
        💲 Skins
      </button>
    )
  }
  return null
}

export { EditRegistrationButton }
