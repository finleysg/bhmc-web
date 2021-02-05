import "./register.scss"
import "../reserve/reserve.scss"

import React from "react"

import { StandardConfirmDialog } from "components/dialog/confirm"
import FriendPicker from "components/directory/friend-picker"
import PeoplePicker from "components/directory/people-picker"
import { useEventRegistration } from "context/registration-context"
import { EventRegistrationSteps } from "context/registration-reducer"

import RegistrationComplete from "./registration-complete"
import RegistrationConfirm from "./registration-confirm"
import RegistrationForm from "./registration-form"
import RegistrationPayment from "./registration-payment"

function RegisterView({ registrationSlots, selectedStart, onCancel }) {
  const {
    clubEvent,
    error, // TODO: add conflict object for 409s
    registration,
    currentStep,
    cancelRegistration,
    updateStep,
    completeRegistration,
    addPlayer,
  } = useEventRegistration()

  const [showConfirm, setShowConfirm] = React.useState(false)
  const cancelRef = React.useRef()

  const layout =
    clubEvent?.maximumSignupGroupSize === 1
      ? "vertical"
      : clubEvent?.fees.length > 5
      ? "vertical"
      : "horizontal"
  const showPickers = clubEvent?.maximumSignupGroupSize > 1

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
          <React.Fragment>
            {showPickers && <PeoplePicker allowNew={false} onSelect={handlePlayerSelect} />}
            <RegistrationForm
              layout={layout}
              title={EventRegistrationSteps.Register.title}
              selectedStart={selectedStart}
              onCancel={setShowConfirm}
              onComplete={() => updateStep(EventRegistrationSteps.Review)}
            />
          </React.Fragment>
        )}
        {currentStep === EventRegistrationSteps.Review && (
          <RegistrationConfirm
            title={EventRegistrationSteps.Review.title}
            selectedStart={selectedStart}
            onBack={() => updateStep(EventRegistrationSteps.Register)}
            onCancel={setShowConfirm}
            onComplete={() => updateStep(EventRegistrationSteps.Payment)}
          />
        )}
        {currentStep === EventRegistrationSteps.Payment && (
          <RegistrationPayment
            title={EventRegistrationSteps.Payment.title}
            selectedStart={selectedStart}
            onBack={() => updateStep(EventRegistrationSteps.Review)}
            onCancel={setShowConfirm}
            onComplete={handleRegistrationComplete}
          />
        )}
        {currentStep === EventRegistrationSteps.Complete && (
          <RegistrationComplete
            title={EventRegistrationSteps.Complete.title}
            selectedStart={selectedStart}
          />
        )}

        {showConfirm && (
          <StandardConfirmDialog
            confirmRef={cancelRef}
            onCancel={() => setShowConfirm(false)}
            onConfirm={handleCancel}
          />
        )}
      </div>
      {showPickers && (
        <div className="col-12 col-md-3">
          <FriendPicker slots={registrationSlots} onSelect={handleFriendSelect} />
        </div>
      )}
    </div>
  )
}

export { RegisterView }