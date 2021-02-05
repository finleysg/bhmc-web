import React from "react"

import { ErrorDisplay } from "components/errors"
import { OverlaySpinner } from "components/spinners"
import { useEventRegistration } from "context/registration-context"
import debounceFn from "debounce-fn"
import { getAmountDue } from "utils/payment-utils"

import RegistrationAmountDue from "./registration-amount-due"
import RegistrationGroup from "./registration-group"

function RegistrationForm(props) {
  const { onCancel, onComplete, selectedStart, title, layout } = props
  const {
    clubEvent,
    error,
    registration,
    payment,
    updateRegistration,
    savePayment,
  } = useEventRegistration()

  const isBusy = registration === undefined || registration.id === undefined

  // Update the registration with changes to the notes.
  const updateNotes = React.useMemo(() => debounceFn(updateRegistration, { wait: 500 }), [
    updateRegistration,
  ])

  const handleNotesChange = (e) => {
    const reg = Object.assign({}, registration, { notes: e.target.value })
    updateNotes(reg)
  }

  const amountDue = getAmountDue(payment, clubEvent.feeMap)

  const confirm = () => {
    savePayment("C", () => {
      onComplete()
    })
  }

  return (
    <div className="card border border-success">
      <div className="card-header bg-success">
        <span className="registration-title">{title}</span>
      </div>
      <div className="card-body">
        <OverlaySpinner loading={isBusy} />
        <h4 className="card-title text-success">{selectedStart}</h4>
        <RegistrationGroup eventFees={clubEvent.fees} layout={layout} />
        <RegistrationAmountDue amountDue={amountDue} />
        <div>
          <ErrorDisplay error={error} isError={Boolean(error)} />
        </div>
        <hr />
        <div className="row">
          <div className="col-12">
            <label>Notes / Special Requests</label>
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
              Confirm & Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationForm