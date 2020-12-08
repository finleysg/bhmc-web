import React from "react"

import { useEventRegistration } from "context/registration-context"
import debounceFn from "debounce-fn"
import { useMyEvents, usePlayer } from "features/account/account-hooks"
import * as config from "utils/app-config"
import { calculateFees } from "utils/payment-utils"

import { RegistrationAmountDueRow, RegistrationTransactionFeeRow } from "./event-registration-rows"
import { RegistrationSlots } from "./event-registration-slots"

function EventRegistrationForm(props) {
  const { onCancel, onReview, onBusy } = props
  const player = usePlayer()
  const myEvents = useMyEvents()

  // TODO: selections must be populated in the "back" scenario
  const [selections, updateSelections] = React.useState([])

  const {
    clubEvent,
    registration,
    payment,
    updateRegistration,
    createPayment,
    updatePayment,
  } = useEventRegistration()

  const isBusy = registration === undefined || registration.id === undefined
  onBusy(isBusy)

  // Update the registration with changes to the notes.
  const updateNotes = React.useMemo(() => debounceFn(updateRegistration, { wait: 500 }), [
    updateRegistration,
  ])

  const handleNotesChange = (e) => {
    registration.notes = e.target.value
    updateNotes(registration)
  }

  // This applies only to the season signup form.
  // TODO: adjust if rate applies for turning NN at any time this season.
  const isReturning = myEvents.indexOf(config.previousSeasonEventId)
  const filteredEventFees = () => {
    const duesCode = isReturning >= 0 ? "RMD" : "NMD"
    const patronCode = player.age >= config.seniorRateAge ? "SPC" : "PC"
    return clubEvent.fees.filter((fee) => fee.code === duesCode || fee.code === patronCode)
  }

  const paymentDetails = () => {
    return filteredEventFees()
      .filter((f) => f.isRequired)
      .concat(selections)
      .map((f) => {
        return {
          eventFeeId: f.id,
          slotId: registration.slots[0].id,
        }
      })
  }

  // event fees based on required fees + optional selections
  const optionalAmountDue = selections.map((f) => f.amount).reduce((f1, f2) => f1 + f2, 0)
  const requiredAmountDue = filteredEventFees()
    .filter((f) => f.isRequired === true)
    .map((f) => f.amount)
    .reduce((f1, f2) => f1 + f2, 0)
  const amountDue = calculateFees(requiredAmountDue + optionalAmountDue)

  const addFee = (fee) => {
    selections.push(fee)
    updateSelections([...selections])
  }

  const removeFee = (fee) => {
    const index = selections.findIndex((f) => f.id === fee.id)
    selections.splice(index, 1)
    updateSelections([...selections])
  }

  const confirm = () => {
    if (payment?.id) {
      payment.details = paymentDetails()
      updatePayment(payment).then(onReview())
    } else {
      createPayment({
        notificationType: isReturning ? "R" : "N",
        details: paymentDetails(),
      }).then(onReview())
    }
  }

  return (
    <div className="card-body">
      {!isBusy && (
        <React.Fragment>
          <RegistrationSlots eventFees={filteredEventFees()} onAdd={addFee} onRemove={removeFee} />
          <RegistrationTransactionFeeRow amountDue={amountDue} />
          <RegistrationAmountDueRow amountDue={amountDue} />
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
        </React.Fragment>
      )}
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
  )
}

export default EventRegistrationForm
