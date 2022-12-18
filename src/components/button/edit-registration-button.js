import { RegistrationSteps } from "context/registration-context"
import * as colors from "styles/colors"

function EditRegistrationButton({ clubEvent, hasSignedUp, currentStep, onClick, ...rest }) {
  if (hasSignedUp && clubEvent?.canEditRegistration && clubEvent?.paymentsAreOpen) {
    return (
      <button
        className="btn btn-success btn-sm"
        style={{ color: colors.white }}
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
