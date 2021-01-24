import "../reserve/reserve.scss"

import React from "react"

import { StandardConfirmDialog } from "components/dialog/confirm"
import { FriendPicker } from "components/directory/friend-picker"
import { Spinner } from "components/spinners"
import { RegistrationSteps, useEventRegistration } from "context/registration-context"
import { useEventRegistrations } from "hooks/event-hooks"
import { useErrorHandler } from "react-error-boundary"
import * as colors from "styles/colors"

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
    removePlayer,
  } = useEventRegistration()
  const registrations = useEventRegistrations(clubEvent?.id)
  const handleError = useErrorHandler()

  const [showConfirm, setShowConfirm] = React.useState(false)
  const [isBusy, setIsBusy] = React.useState(false)
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
    updateStep(RegistrationSteps.Complete)
  }

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card border border-success">
          <div className="card-header bg-success">
            <span style={{ color: colors.white, fontSize: "1.2rem", marginRight: "1rem" }}>
              {currentStep.title}
            </span>
            {isBusy && (
              <span>
                <Spinner style={{ fontSize: "2rem", color: colors.white }} />
              </span>
            )}
          </div>
          {currentStep === RegistrationSteps.Register && (
            <RegistrationForm
              // feeFilter={props.feeFilter}
              // getNotificationType={props.getNotificationType}
              onBusy={(busy) => setIsBusy(busy)}
              onCancel={setShowConfirm}
              onComplete={() => updateStep(RegistrationSteps.Review)}
            />
          )}
          {currentStep === RegistrationSteps.Review && (
            <EventRegistrationConfirm
              onBack={() => updateStep(RegistrationSteps.Register)}
              onBusy={(busy) => setIsBusy(busy)}
              onCancel={setShowConfirm}
              onComplete={() => updateStep(RegistrationSteps.Payment)}
            />
          )}
          {currentStep === RegistrationSteps.Payment && (
            <EventRegistrationPayment
              onBack={() => updateStep(RegistrationSteps.Review)}
              onBusy={(busy) => setIsBusy(busy)}
              onCancel={setShowConfirm}
              onComplete={handleRegistrationComplete}
            />
          )}
          {currentStep === RegistrationSteps.Complete && <EventRegistrationComplete />}
        </div>
        {showConfirm && (
          <StandardConfirmDialog
            confirmRef={cancelRef}
            onCancel={() => setShowConfirm(false)}
            onConfirm={handleCancel}
          />
        )}
      </div>
      <div className="col-md-4">
        <FriendPicker
          alreadyRegistered={playerIdsAlreadyRegistered}
          onSelect={handleFriendSelect}
        />
      </div>
    </div>
  )
}

export { RegisterView }
