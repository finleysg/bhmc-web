import React from "react"

import { OverlaySpinner } from "components/spinners"
import { useClient } from "context/auth-context"
import { ReserveSlot } from "models/reserve"
import Modal from "react-bootstrap/Modal"
import { useAsync } from "utils/use-async"

import { RefundSlotDetail } from "./refund-slot-detail"

/**
 * Add a refund detail collection to each slot to be dropped.
 * @param {ReserveSlot[]} slots - the slots selected to be dropped
 * @param {any[]} payments - api payment data for the event
 * @param {EventFee[]} eventFees - fee details for the event
 * @returns
 */
const createRefundDetails = (slots, payments, eventFeeMap) => {
  const transformedSlots = []
  const slotIds = slots.map((s) => s.id)
  const filteredPayments = payments.filter(
    (p) => p.confirmed && p.payment_details.some((d) => slotIds.indexOf(d.registration_slot) >= 0),
  )
  slots.forEach((slot) => {
    const newSlot = new ReserveSlot(slot.groupId, slot.obj)
    filteredPayments.forEach((payment) => {
      const paymentDetails = payment.payment_details.filter((d) => d.registration_slot === slot.id)
      paymentDetails.forEach((detail) => {
        newSlot.fees.push({
          id: detail.id,
          eventFee: eventFeeMap.get(detail.event_fee),
          paidBy: `${payment.user_first_name} ${payment.user_last_name}`,
          payment: payment,
          selected: true,
        })
      })
    })
    transformedSlots.push(newSlot)
  })
  return transformedSlots
}

function DropPlayers({ clubEvent, slots, showDrop, onDrop, onCancel }) {
  const [dropSlots, setDropSlots] = React.useState([])
  const [dropNotes, setDropNotes] = React.useState("")
  const { data, isLoading, run } = useAsync()
  const client = useClient()

  React.useEffect(() => {
    run(client(`reports/payment-report/${clubEvent.id}`))
  }, [run, client, clubEvent])

  React.useEffect(() => {
    if (data && data.length > 0) {
      const transformedSlots = createRefundDetails(slots, data, clubEvent.feeMap)
      setDropSlots(transformedSlots)
    }
  }, [data, slots, clubEvent])

  const refundAmount = () => {
    return dropSlots
      .flatMap((slot) => slot.fees)
      .filter((fee) => fee.selected)
      .reduce((acc, curr) => {
        return acc + curr.eventFee.amount
      }, 0)
  }

  const handleSelect = ({ paymentDetailId, selected }) => {
    slots = dropSlots.slice(0)
    slots.forEach((slot) => {
      slot.fees.forEach((fee) => {
        if (fee.id === paymentDetailId) {
          fee.selected = selected
        }
      })
    })
    setDropSlots(slots)
  }

  const handleDrop = () => {
    onDrop(dropSlots, dropNotes)
  }

  const updateDropNotes = (e) => {
    setDropNotes(e.target.value)
  }

  return (
    <Modal show={showDrop} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title>Drop Players</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "1rem 0" }}>
        <div className="card border border-danger">
          <div className="card-body">
            <OverlaySpinner loading={isLoading} />
            {dropSlots.map((slot) => {
              return <RefundSlotDetail key={slot.id} slot={slot} onSelect={handleSelect} />
            })}
            <div className="form-group mt-4">
              <label htmlFor="refundNotes">Refund Notes</label>
              <textarea
                name="refundNotes"
                className="form-control"
                style={{ fontSize: ".9rem" }}
                onChange={updateDropNotes}
              />
              <i className="form-group__bar"></i>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ flex: 1, fontWeight: "bold" }}>Refund amount: ${refundAmount()}</div>
        <button className="btn btn-light mr-2" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleDrop}>
          Confirm Drop
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default DropPlayers
