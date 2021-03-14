import React from "react"

import { RegistrationSteps } from "context/registration-context"

function EditRegistrationButton({ clubEvent, hasSignedUp, currentStep, onClick, ...rest }) {
  if (hasSignedUp && clubEvent?.canEditRegistration && clubEvent?.paymentsAreOpen) {
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
