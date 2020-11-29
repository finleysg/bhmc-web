import { useEventRegistration } from "context/registration-context"
import { EventFee } from "models/club-event"
import Player from "models/player"

import { usePlayers } from "./registration-hooks"

function EventRegistrationConfirm(props) {
  const { onBack, onConfirm } = props
  const players = usePlayers()
  const { clubEvent, registration, payment } = useEventRegistration()

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
      <h6 className="card-subtitle">{clubEvent.startDate.format("MMMM DD, yyyy")}</h6>
      {registration.slots.map((slot) => {
        return (
          <div key={slot.id} className="row" style={{ marginBottom: "1rem" }}>
            <div className="col-4">
              <strong>{findPlayer(slot.playerId).name}</strong>
            </div>
            <div className="col-8">
              {payment &&
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
          <button className="btn btn-light" onClick={onBack}>
            Back
          </button>
          <button className="btn btn-success" style={{ marginLeft: "1rem" }} onClick={onConfirm}>
            Looks Good!
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventRegistrationConfirm
