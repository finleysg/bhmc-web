import React from "react"

import RegistrationAmountDue from "components/event-registration/registration-amount-due"
import RegistrationGroup from "components/event-registration/registration-group"
import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import debounceFn from "debounce-fn"
import { getAmountDue } from "utils/payment-utils"

function RegisterInfo({ onCancel, onComplete, selectedStart, title, layout, ...rest }) {
  const {
    clubEvent,
    registration,
    payment,
    updateRegistration,
    removePlayer,
    addFee,
    removeFee,
  } = useEventAdmin()

  const isBusy = registration === undefined || registration?.id === undefined

  // Update the registration with changes to the notes.
  const updateNotes = React.useMemo(() => debounceFn(updateRegistration, { wait: 500 }), [
    updateRegistration,
  ])

  const handleNotesChange = (e) => {
    const reg = Object.assign({}, registration, { notes: e.target.value })
    updateNotes(reg)
  }

  const amountDue = getAmountDue(payment, clubEvent.feeMap, true) // true -> excludeTransactionFee

  const confirm = () => {
    onComplete()
  }

  return (
    <div className="card border border-success" {...rest}>
      <div className="card-header bg-success">
        <span className="registration-title">{title}</span>
      </div>
      <div className="card-body">
        <OverlaySpinner loading={isBusy} />
        <h4 className="card-title text-success">{selectedStart}</h4>
        <RegistrationGroup
          eventFees={clubEvent.fees}
          registration={registration}
          payment={payment}
          removePlayer={removePlayer}
          addFee={addFee}
          removeFee={removeFee}
          layout={layout}
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
              rows="4"
              name="notes"
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
              Payment Info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterInfo
