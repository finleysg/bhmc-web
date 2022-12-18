import React from "react"

import RegistrationAmountDue from "components/event-registration/registration-amount-due"
import RegistrationGroup from "components/event-registration/registration-group"
import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import debounceFn from "debounce-fn"
import { toast } from "react-toastify"
import { getAmountChange, getAmountDue } from "utils/payment-utils"

function RegisterInfo({ onCancel, onComplete, selectedStart, title, layout, mode, ...rest }) {
  const [amountDue, updateAmountDue] = React.useState(0)
  const { clubEvent, registration, payment, updateRegistration, removePlayer, addFee, removeFee } =
    useEventAdmin()

  React.useEffect(() => {
    const due =
      mode === "edit"
        ? getAmountChange(payment, clubEvent.feeMap)
        : getAmountDue(payment, clubEvent.feeMap, true) // true -> excludeTransactionFee
    updateAmountDue(due)
  }, [mode, payment, clubEvent])

  const isBusy = registration === undefined || registration?.id === undefined

  // Update the registration with changes to the notes.
  const updateNotes = React.useMemo(
    () => debounceFn(updateRegistration, { wait: 500 }),
    [updateRegistration],
  )

  const handleNotesChange = (e) => {
    const reg = Object.assign({}, registration, { notes: e.target.value })
    updateNotes(reg)
  }

  const handleAddFee = ({ eventFeeId, slotId }) => {
    addFee({ eventFeeId, slotId, mode })
  }

  const handleRemoveFee = ({ eventFeeId, slotId }) => {
    removeFee({ eventFeeId, slotId, mode })
  }

  const confirm = () => {
    if (amountDue.total < 0) {
      const adds = payment.edits.filter((e) => e.action === "add")
      if (adds && adds.length > 0) {
        toast.error(
          "We cannot create refunds when you have also added new fees. Do that in separate steps.",
          {
            autoClose: 5000,
            closeOnClick: true,
          },
        )
        return
      }
    }
    onComplete(amountDue)
  }

  return (
    <div className="card border border-success" {...rest}>
      <div className="card-header bg-success">
        <span className="registration-title">{title}</span>
      </div>
      <div className="card-body">
        <OverlaySpinner loading={isBusy} />
        <h4 className="card-title text-success">{selectedStart}</h4>
        {!isBusy && (
          <>
            <RegistrationGroup
              eventFees={clubEvent.fees}
              registration={registration}
              payment={payment}
              removePlayer={removePlayer}
              addFee={handleAddFee}
              removeFee={handleRemoveFee}
              layout={layout}
              mode={mode}
            />
            <RegistrationAmountDue amountDue={amountDue} />
            <hr />
            <div className="row">
              <div className="col-12">
                <label>Notes</label>
                <textarea
                  className="form-control fc-alt"
                  defaultValue={registration.notes}
                  onChange={handleNotesChange}
                  name="notes"
                  style={{ height: "100px" }}
                ></textarea>
              </div>
            </div>
            <div className="row" style={{ marginTop: "1rem", textAlign: "right" }}>
              <div className="col-12">
                <button
                  className="btn btn-light"
                  disabled={isBusy}
                  onClick={() => onCancel(registration.id)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  disabled={isBusy}
                  style={{ marginLeft: ".5rem" }}
                  onClick={confirm}
                >
                  {amountDue.total > 0 && "Payment Info"}
                  {amountDue.total < 0 && "Refund"}
                  {amountDue.total === 0 && "Save"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default RegisterInfo
