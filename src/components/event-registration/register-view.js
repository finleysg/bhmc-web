import "./register.scss"
import "../reserve/reserve.scss"

import React from "react"

import { StandardConfirmDialog } from "components/dialog/confirm"
import { FriendPicker } from "components/directory/friend-picker"
import { useEventRegistration } from "context/registration-context"
import { EventRegistrationSteps } from "context/registration-reducer"
import { useEventRegistrations } from "hooks/event-hooks"
import { useErrorHandler } from "react-error-boundary"

import EventRegistrationComplete from "./event-registration-complete"
import EventRegistrationConfirm from "./event-registration-confirm"
import EventRegistrationPayment from "./event-registration-payment"
import { RegistrationForm } from "./registration-form"

function RegisterView({ onCancel }) {
  const {
    clubEvent,
    error,
    registration,
    currentStep,
    cancelRegistration,
    updateStep,
    completeRegistration,
    addPlayer,
  } = useEventRegistration()
  const registrations = useEventRegistrations(clubEvent?.id)
  const handleError = useErrorHandler()

  const [showConfirm, setShowConfirm] = React.useState(false)
  const cancelRef = React.useRef()

  const playerIdsAlreadyRegistered = registrations.flatMap((r) =>
    r.slots.filter((s) => s.status === "R").map((s) => s.playerId),
  )

  React.useEffect(() => {
    if (error) {
      handleError(error)
    }
    return () => {
      completeRegistration()
    }
  }, [completeRegistration, error, handleError])

  const handleFriendSelect = (friend) => {
    addPlayer(friend)
  }

  const handleCancel = () => {
    setShowConfirm(false)
    cancelRegistration(registration.id)
    onCancel()
  }

  const handleRegistrationComplete = () => {
    updateStep(EventRegistrationSteps.Complete)
  }

  return (
    <div className="row">
      <div className="col-md-6">
        {currentStep === EventRegistrationSteps.Register && (
          <RegistrationForm
            title={currentStep.title}
            onCancel={setShowConfirm}
            onComplete={() => updateStep(EventRegistrationSteps.Review)}
          />
        )}
        {currentStep === EventRegistrationSteps.Review && (
          <EventRegistrationConfirm
            onBack={() => updateStep(EventRegistrationSteps.Register)}
            onCancel={setShowConfirm}
            onComplete={() => updateStep(EventRegistrationSteps.Payment)}
          />
        )}
        {currentStep === EventRegistrationSteps.Payment && (
          <EventRegistrationPayment
            onBack={() => updateStep(EventRegistrationSteps.Review)}
            onCancel={setShowConfirm}
            onComplete={handleRegistrationComplete}
          />
        )}
        {currentStep === EventRegistrationSteps.Complete && <EventRegistrationComplete />}

        {showConfirm && (
          <StandardConfirmDialog
            confirmRef={cancelRef}
            onCancel={() => setShowConfirm(false)}
            onConfirm={handleCancel}
          />
        )}
      </div>
      <div className="col-md-3">
        <FriendPicker
          alreadyRegistered={playerIdsAlreadyRegistered}
          onSelect={handleFriendSelect}
        />
      </div>
    </div>
  )
}

export { RegisterView }
