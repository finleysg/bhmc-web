import React from "react"

import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import { useSyncRegistrationFees } from "hooks/admin-hooks"
import { usePlayer } from "hooks/player-hooks"
import { toast } from "react-toastify"
import { getAmountChange, getAmountDue } from "utils/payment-utils"

import { PaymentForm } from "./payment-form"

function PaymentInfo(props) {
  const { onBack, onComplete, onCancel, selectedStart, title, mode } = props
  const [isBusy, setIsBusy] = React.useState(false)
  const { clubEvent, registration, payment, existingFees, createPayment } = useEventAdmin()
  const syncFees = useSyncRegistrationFees()

  // Associate the payment record with the first (or only) player selected
  const player = usePlayer(registration.slots[0].playerId)

  const amountDue =
    mode === "edit"
      ? getAmountChange(payment, clubEvent.feeMap)
      : getAmountDue(payment, clubEvent.feeMap, true) // true -> excludeTransactionFee

  const publishBusyFeedback = (busy) => {
    setIsBusy(busy)
  }

  const submitPayment = async ({ amountDue, paymentCode }) => {
    publishBusyFeedback(true)

    const updatedPayment = { ...payment }
    updatedPayment.paymentCode = paymentCode
    updatedPayment.paymentAmount = amountDue

    try {
      await createPayment({ payment: updatedPayment, player: player })
      if (mode === "edit") {
        await syncFees(payment, existingFees)
      }
      toast.success("💸 Registration and payment saved.")
      onComplete()
    } catch (err) {
      toast.error(`😟 Something went wrong: ${err}`)
    } finally {
      publishBusyFeedback(false)
    }
  }

  return (
    <div className="card border border-success">
      <div className="card-header bg-success">
        <span className="registration-title">{title}</span>
      </div>
      <div className="card-body">
        <OverlaySpinner loading={isBusy} />
        <h4 className="card-title text-success">{selectedStart}</h4>
        <div style={{ marginBottom: "1rem" }}>
          <PaymentForm
            amountDue={amountDue.total.toFixed(2)}
            isBusy={isBusy}
            onSubmit={submitPayment}
            onCancel={onCancel}
            onBack={onBack}
          />
        </div>
      </div>
    </div>
  )
}

export default PaymentInfo
