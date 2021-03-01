import "../event-registration/register.scss"
import "../reserve/reserve.scss"

import React from "react"

import PaymentInfo from "components/admin/payment-info"
import { StandardConfirmDialog } from "components/dialog/confirm"
import PeoplePicker from "components/directory/people-picker"
import { useEventAdmin } from "context/admin-context"
import { EventAdminSteps } from "context/admin-reducer"

import RegisterDone from "./register-done"
import RegisterInfo from "./register-info"

function RegisterAdmin({ selectedStart, onCancel }) {
  const {
    clubEvent,
    registration,
    currentStep,
    cancelRegistration,
    updateStep,
    addPlayer,
  } = useEventAdmin()

  const [showConfirm, setShowConfirm] = React.useState(false)
  const cancelRef = React.useRef()

  const layout =
    clubEvent?.maximumSignupGroupSize === 1
      ? "vertical"
      : clubEvent?.fees.length > 5
      ? "vertical"
      : "horizontal"

  const handlePlayerSelect = (player) => {
    const slot = registration.slots.find((slot) => !Boolean(slot.playerId))
    if (Boolean(slot)) {
      addPlayer(slot, player)
    }
  }

  const handleCancel = () => {
    setShowConfirm(false)
    cancelRegistration(registration.id)
    onCancel()
  }

  return (
    <div className="row">
      <div className="col-12 col-md-6">
        {currentStep === EventAdminSteps.Register && (
          <div>
            <RegisterInfo
              layout={layout}
              title={EventAdminSteps.Register.title}
              selectedStart={selectedStart}
              onCancel={setShowConfirm}
              onComplete={() => updateStep(EventAdminSteps.Payment)}
            />
            <PeoplePicker
              style={{ position: "absolute", top: "12px", right: "30px" }}
              allowNew={false}
              clubEvent={clubEvent}
              onSelect={handlePlayerSelect}
            />
          </div>
        )}
        {currentStep === EventAdminSteps.Payment && (
          <PaymentInfo
            title={EventAdminSteps.Payment.title}
            selectedStart={selectedStart}
            onBack={() => updateStep(EventAdminSteps.Register)}
            onCancel={setShowConfirm}
            onComplete={() => updateStep(EventAdminSteps.Complete)}
          />
        )}
        {currentStep === EventAdminSteps.Complete && (
          <RegisterDone title={EventAdminSteps.Complete.title} selectedStart={selectedStart} />
        )}
        {showConfirm && (
          <StandardConfirmDialog
            confirmRef={cancelRef}
            onCancel={() => setShowConfirm(false)}
            onConfirm={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export { RegisterAdmin }
