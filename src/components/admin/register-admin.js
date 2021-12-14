import "../event-registration/register.scss"
import "../reserve/reserve.scss"

import React from "react"

import PaymentInfo from "components/admin/payment-info"
import PeoplePicker from "components/directory/people-picker"
import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import { EventAdminSteps } from "context/admin-reducer"
import { useIssueRefunds, useSyncRegistrationFees } from "hooks/admin-hooks"
import { toast } from "react-toastify"
import { createRefunds } from "utils/payment-utils"

import RefundInfo from "./refund-info"
import RegisterDone from "./register-done"
import RegisterInfo from "./register-info"

function RegisterAdmin({ selectedStart, mode, onCancel }) {
  const { clubEvent, registration, payment, existingFees, currentStep, cancelRegistration, updateStep, addPlayer } =
    useEventAdmin()

  const [busy, setBusy] = React.useState(false)
  const issueRefunds = useIssueRefunds()
  const syncFees = useSyncRegistrationFees()

  React.useEffect(() => {
    if (mode === "edit") {
      updateStep(EventAdminSteps.Edit)
    } else {
      updateStep(EventAdminSteps.Register)
    }
  }, [mode, updateStep])

  const layout =
    clubEvent?.maximumSignupGroupSize === 1 ? "vertical" : clubEvent?.fees.length > 5 ? "vertical" : "horizontal"

  const handlePlayerSelect = (player) => {
    const slot = registration.slots.find((slot) => !slot.playerId)
    if (slot) {
      addPlayer(slot, player)
    }
  }

  const handleEditComplete = (amountDue) => {
    if (amountDue.total > 0) {
      updateStep(EventAdminSteps.Payment)
    } else if (amountDue.total < 0) {
      updateStep(EventAdminSteps.Refund)
    } else {
      syncFees(payment, existingFees)
      updateStep(EventAdminSteps.Complete)
      toast.success("Registration fees have been updated")
    }
  }

  const handleBackToRegister = () => {
    if (mode === "add") {
      updateStep(EventAdminSteps.Register)
    } else {
      updateStep(EventAdminSteps.Edit)
    }
  }

  // only handles removing fees - not a mix of add and removes
  const handleRefund = (refundSlots, refundNotes) => {
    const refunds = createRefunds(refundSlots, refundNotes)
    setBusy(true)

    issueRefunds(refunds)
      .then(() => {
        syncFees(payment, existingFees)
        updateStep(EventAdminSteps.Complete)
        toast.success("Registration fees have been updated")
      })
      .catch((err) => toast.error("Failed to issue a refund: " + err))
      .finally(() => setBusy(false))
  }

  const handleCancel = () => {
    if (mode === "add") {
      cancelRegistration(registration.id)
    }
    onCancel()
  }

  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <OverlaySpinner loading={busy} />
        {currentStep === EventAdminSteps.Register && (
          <div>
            <RegisterInfo
              layout={layout}
              mode={mode}
              title={EventAdminSteps.Register.title}
              selectedStart={selectedStart}
              onCancel={handleCancel}
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
        {currentStep === EventAdminSteps.Edit && (
          <div>
            <RegisterInfo
              layout={layout}
              mode={mode}
              title={EventAdminSteps.Edit.title}
              selectedStart={selectedStart}
              onCancel={handleCancel}
              onComplete={handleEditComplete}
            />
          </div>
        )}
        {currentStep === EventAdminSteps.Payment && (
          <PaymentInfo
            title={EventAdminSteps.Payment.title}
            mode={mode}
            selectedStart={selectedStart}
            onBack={handleBackToRegister}
            onCancel={handleCancel}
            onComplete={() => updateStep(EventAdminSteps.Complete)}
          />
        )}
        {currentStep === EventAdminSteps.Refund && (
          <RefundInfo
            title={EventAdminSteps.Refund.title}
            selectedStart={selectedStart}
            onBack={handleBackToRegister}
            onCancel={handleCancel}
            onRefund={handleRefund}
          />
        )}
        {currentStep === EventAdminSteps.Complete && (
          <RegisterDone title={EventAdminSteps.Complete.title} selectedStart={selectedStart} />
        )}
      </div>
    </div>
  )
}

export { RegisterAdmin }
