import "./register.scss"
import "../reserve/reserve.scss"

import React from "react"

import { StandardConfirmDialog } from "components/dialog/confirm"
import FriendPicker from "components/directory/friend-picker"
import PeoplePicker from "components/directory/people-picker"
import { useEventRegistration } from "context/registration-context"
import { EventRegistrationSteps } from "context/registration-reducer"
import { useAddFriend } from "hooks/account-hooks"
import { getAmountDue } from "utils/payment-utils"

import RegistrationComplete from "./registration-complete"
import RegistrationConfirm from "./registration-confirm"
import RegistrationForm from "./registration-form"
import RegistrationPayment from "./registration-payment"

function RegisterView({ selectedStart, mode, onCancel }) {
  const {
    clubEvent,
    registration,
    payment,
    currentStep,
    cancelRegistration,
    updateStep,
    addPlayer,
  } = useEventRegistration()
  const { mutate: addFriend } = useAddFriend()

  const [showConfirm, setShowConfirm] = React.useState(false)
  const cancelRef = React.useRef()

  const layout =
    clubEvent?.maximumSignupGroupSize === 1
      ? "vertical"
      : clubEvent?.fees.length > 5
      ? "vertical"
      : "horizontal"
  const showPickers = mode === "new" && clubEvent?.maximumSignupGroupSize > 1

  const handleFriendSelect = (friend) => {
    const slot = registration.slots.find((slot) => !Boolean(slot.playerId))
    if (Boolean(slot)) {
      addPlayer(slot, friend)
    }
  }

  const handlePlayerSelect = (player) => {
    const slot = registration.slots.find((slot) => !Boolean(slot.playerId))
    if (Boolean(slot)) {
      addPlayer(slot, player)
      addFriend(player.id)
    }
  }

  const handleCancel = () => {
    setShowConfirm(false)
    if (mode === "new") {
      cancelRegistration({ registrationId: registration.id, paymentId: payment?.id })
    }
    onCancel()
  }

  const handleRegistrationConfirm = () => {
    const amountDue = getAmountDue(payment, clubEvent.feeMap)
    if (amountDue.total > 0) {
      updateStep(EventRegistrationSteps.Payment)
    } else {
      updateStep(EventRegistrationSteps.Complete)
    }
  }

  const handleRegistrationComplete = () => {
    updateStep(EventRegistrationSteps.Complete)
  }

  return (
    <div className="row">
      <div className="col-12 col-md-6">
        {currentStep === EventRegistrationSteps.Register && (
          <div>
            <RegistrationForm
              layout={layout}
              mode={mode}
              title={EventRegistrationSteps.Register.title}
              selectedStart={selectedStart}
              onCancel={setShowConfirm}
              onComplete={() => updateStep(EventRegistrationSteps.Review)}
            />
            {showPickers && (
              <PeoplePicker
                style={{ position: "absolute", top: "12px", right: "30px" }}
                allowNew={false}
                clubEvent={clubEvent}
                onSelect={handlePlayerSelect}
              />
            )}
          </div>
        )}
        {currentStep === EventRegistrationSteps.Review && (
          <RegistrationConfirm
            title={EventRegistrationSteps.Review.title}
            selectedStart={selectedStart}
            onBack={() => updateStep(EventRegistrationSteps.Register)}
            onCancel={setShowConfirm}
            onComplete={handleRegistrationConfirm}
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
            mode={mode}
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
          <FriendPicker clubEvent={clubEvent} onSelect={handleFriendSelect} />
        </div>
      )}
    </div>
  )
}

export { RegisterView }
