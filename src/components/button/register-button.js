import { RegistrationSteps } from "context/registration-context"
import { usePlayer } from "hooks/account-hooks"

function RegisterButton({ clubEvent, hasSignedUp, isMember, currentStep, onClick, ...rest }) {
  // const [canRegister, setCanRegister] = React.useState(false)
  const player = usePlayer()

  const canRegister = () => {
    if (!player.id) {
      return false
    } else if (hasSignedUp) {
      return false
    } else if (clubEvent?.registrationTypeCode === "N") {
      return false
    } else if (!clubEvent?.registrationIsOpen) {
      return false
    } else if (clubEvent.registrationTypeCode !== "O" && !isMember) {
      return false
    } else if (clubEvent.ghinRequired && !player.ghin) {
      return false
    }
    return true
  }
  // React.useEffect(() => {

  // }, [clubEvent, player, isMember, hasSignedUp])

  if (canRegister()) {
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
