import React from "react"

import { useEventRegistration } from "context/registration-context"
import { format } from "date-fns"
import { EventFee } from "models/club-event"
import { Payment } from "models/payment"
import Player from "models/player"

import { usePlayers } from "../../hooks/player-hooks"

function EventRegistrationConfirm(props) {
  const { onBack, onComplete, onCancel, onBusy } = props
  const players = usePlayers()
  const { clubEvent, registration, payment } = useEventRegistration()

  // When the user navigates back and forth between the reg form and confirm
  // screens, this is a reliable way of telling if we have reloaded the
  // payment record from the back end.
  const isBusy = !(payment instanceof Payment && payment.hasPaymentDetails())
  React.useEffect(() => {
    onBusy(isBusy)
  }, [isBusy, onBusy])

  const findPlayer = (id) => {
    const index = players.findIndex((p) => p.id === id)
    if (index >= 0) {
      return players[index]
    }
    return new Player({})
  }

  const findEventFee = (id) => {
    const index = clubEvent.fees.findIndex((f) => f.id === id)
    if (index >= 0) {
      return clubEvent.fees[index]
    }
    return new EventFee({})
  }

  return (
    <div className="card-body">
      <h4 className="card-title">{clubEvent.name}</h4>
      <h6 className="card-subtitle" style={{ marginTop: "1rem" }}>
        {format(clubEvent.startDate, "MMMM d, yyyy")}
      </h6>
      {registration.slots.map((slot) => {
        return (
          <div key={slot.id} className="row" style={{ marginBottom: "1rem" }}>
            <div className="col-4">
              <strong>{findPlayer(slot.playerId).name}</strong>
            </div>
            <div className="col-8">
              {!isBusy &&
                payment.details
                  .filter((f) => f.slotId === slot.id)
                  .map((f) => {
                    return (
                      <p key={`${f.slotId}-${f.id}`} style={{ margin: 0 }}>
                        {findEventFee(f.eventFeeId).name}
                      </p>
                    )
                  })}
            </div>
          </div>
        )
      })}
      <div className="row" style={{ marginBottom: "1rem" }}>
        <div className="col-4">
          <strong>Amount Due</strong>
        </div>
        <div className="col-8">
          <p style={{ margin: 0 }}>${payment?.paymentAmount}</p>
        </div>
      </div>
      <div className="row" style={{ marginBottom: "1rem" }}>
        <div className="col-12">
          <strong>Notes</strong>
          <p style={{ margin: 0 }}>{registration.notes}</p>
        </div>
      </div>
      <hr />
      <div className="row" style={{ textAlign: "right" }}>
        <div className="col-12">
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
            Looks Good!
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventRegistrationConfirm
