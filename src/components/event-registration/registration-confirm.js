import React from "react"

import { ErrorDisplay } from "components/errors"
import { OverlaySpinner } from "components/spinners"
import { useEventRegistration } from "context/registration-context"
import { Payment } from "models/payment"
import { getAmountDue } from "utils/payment-utils"

import RegistrationSlotReview from "./registration-slot-review"

function RegistrationConfirm(props) {
  const { onBack, onComplete, onCancel, selectedStart, title } = props
  const { clubEvent, registration, payment, error } = useEventRegistration()

  const isBusy = !(payment instanceof Payment && payment.hasPaymentDetails())
  const amountDue = getAmountDue(payment, clubEvent.feeMap)

  return (
    <div className="card border border-success">
      <div className="card-header bg-success">
        <span className="registration-title">{title}</span>
      </div>
      <div className="card-body">
        <OverlaySpinner loading={isBusy} />
        <h4 className="card-title text-success">{selectedStart}</h4>
        {!isBusy &&
          registration.slots
            .filter((s) => Boolean(s.playerId))
            .map((slot) => {
              return (
                <RegistrationSlotReview
                  key={slot.id}
                  slot={slot}
                  paymentDetails={payment.details}
                  fees={clubEvent.fees}
                />
              )
            })}
        <div
          className="text-primary"
          style={{
            textAlign: "right",
            marginBottom: "1rem",
            fontWeight: "bold",
            marginRight: ".5rem",
          }}
        >
          Amount Due: ${amountDue.total.toFixed(2)}
        </div>
        {registration.notes && (
          <div style={{ marginBottom: "1rem" }}>
            <span>Notes</span>
            <p style={{ margin: 0, fontStyle: "italic" }}>{registration.notes}</p>
          </div>
        )}
        <div>
          <ErrorDisplay error={error} isError={Boolean(error)} />
        </div>
        <hr />
        <div style={{ textAlign: "right" }}>
          <button className="btn btn-light" disabled={isBusy} onClick={onBack}>
            Back
          </button>
          <button
            className="btn btn-light"
            disabled={isBusy}
            style={{ marginLeft: ".5rem" }}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-success"
            disabled={isBusy}
            style={{ marginLeft: ".5rem" }}
            onClick={onComplete}
          >
            👍 Looks Good
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegistrationConfirm
