import "./register.scss"
import "../reserve/reserve.scss"

import React from "react"

import { StandardConfirmDialog } from "components/dialog/confirm"
import { FriendPicker } from "components/directory/friend-picker"
import PeoplePicker from "components/directory/people-picker"
import { useEventRegistration } from "context/registration-context"
import { EventRegistrationSteps } from "context/registration-reducer"
import { useErrorHandler } from "react-error-boundary"

import EventRegistrationComplete from "./event-registration-complete"
import EventRegistrationConfirm from "./event-registration-confirm"
import EventRegistrationPayment from "./event-registration-payment"
import RegistrationForm from "./registration-form"

function RegisterView({ registrationSlots, title, onCancel }) {
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
  const handleError = useErrorHandler()

  const [showConfirm, setShowConfirm] = React.useState(false)
  const cancelRef = React.useRef()

  const layout = clubEvent?.maximumSignupGroupSize === 1 ? "vertical" : "horizontal"

  React.useEffect(() => {
    if (error) {
      handleError(error)
    }
    return () => {
      completeRegistration()
    }
  }, [completeRegistration, error, handleError])

  const handleFriendSelect = (friend) => {
    const slot = registration.slots.find((slot) => !Boolean(slot.playerId))
    if (Boolean(slot)) {
      addPlayer(slot, friend)
    }
  }

  const handlePlayerSelect = (player) => {
    const slot = registration.slots.find((slot) => !Boolean(slot.playerId))
    if (Boolean(slot)) {
      // TODO: add to friends list
      addPlayer(slot, player)
    }
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
      <div className="col-12 col-md-6">
        {currentStep === EventRegistrationSteps.Register && (
          <>
            <PeoplePicker allowNew={false} onSelect={handlePlayerSelect} />
            <RegistrationForm
              layout={layout}
              title={title}
              onCancel={setShowConfirm}
              onComplete={() => updateStep(EventRegistrationSteps.Review)}
            />
          </>
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
      <div className="col-12 col-md-3">
        <FriendPicker slots={registrationSlots} onSelect={handleFriendSelect} />
      </div>
    </div>
  )
}

export { RegisterView }
