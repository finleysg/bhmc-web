import React from "react"

import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"
import { useClient } from "context/auth-context"
import { uniq } from "lodash"
import { ReserveSlot } from "models/reserve"
import { useAsync } from "utils/use-async"

import { RefundSlotDetail } from "./refund-slot-detail"

/**
 * Add a refund detail collection to each slot + fee to be dropped.
 * @param {Registration} registration - the registration being edited
 * @param {Payment} payment - a payment placeholder with an edits collection
 * @param {any[]} payments - api payment data for the event
 * @param {EventFee[]} eventFees - fee details for the event
 * @returns
 */
const createRefundDetails = (registration, payment, payments, eventFeeMap) => {
  const transformedSlots = [] // collection of pending refunds for the ui

  const pendingRefunds = payment.edits.filter((e) => e.action === "remove")
  const slotIds = uniq(pendingRefunds.map((pr) => pr.slotId))
  const filteredPayments = payments.filter(
    (p) => p.confirmed && p.payment_details.some((d) => slotIds.indexOf(d.registration_slot) >= 0),
  )
  slotIds.forEach((id) => {
    const existingSlot = registration.slots.find((s) => s.id === id)
    const newSlot = new ReserveSlot(0, existingSlot.obj)
    filteredPayments.forEach((payment) => {
      const paymentDetails = payment.payment_details.filter((d) => d.registration_slot === id)
      paymentDetails.forEach((detail) => {
        // Only if a given fee was removed...
        const prSlot = pendingRefunds.find((pr) => pr.slotId === id && pr.eventFeeId === detail.event_fee)
        if (prSlot) {
          newSlot.fees.push({
            id: detail.id,
            eventFee: eventFeeMap.get(detail.event_fee),
            paidBy: `${payment.user_first_name} ${payment.user_last_name}`,
            payment: payment,
            selected: true,
          })
        }
      })
    })
    transformedSlots.push(newSlot)
  })

  return transformedSlots
}

function RefundInfo(props) {
  const { onBack, onRefund, onCancel, selectedStart, title } = props
  const { clubEvent, registration, payment } = useEventAdmin()

  const [refundSlots, setRefundSlots] = React.useState([])
  const [refundNotes, setRefundNotes] = React.useState("")
  const { data, isLoading, run } = useAsync()
  const client = useClient()

  React.useEffect(() => {
    run(client(`reports/payment-report/${clubEvent.id}`))
  }, [run, client, clubEvent])

  React.useEffect(() => {
    if (data && data.length > 0) {
      const transformedSlots = createRefundDetails(registration, payment, data, clubEvent.feeMap)
      setRefundSlots(transformedSlots)
    }
  }, [data, registration, payment, clubEvent])

  const refundAmount = () => {
    return refundSlots
      .flatMap((slot) => slot.fees)
      .filter((fee) => fee.selected)
      .reduce((acc, curr) => {
        return acc + curr.eventFee.amount
      }, 0)
  }

  const handleSelect = ({ paymentDetailId, selected }) => {
    const slots = refundSlots.slice(0)
    slots.forEach((slot) => {
      slot.fees.forEach((fee) => {
        if (fee.id === paymentDetailId) {
          fee.selected = selected
        }
      })
    })
    setRefundSlots(slots)
  }

  const handleRefund = () => {
    onRefund(refundSlots, refundNotes)
  }

  const updateDropNotes = (e) => {
    setRefundNotes(e.target.value)
  }

  return (
    <div className="card border border-danger">
      <div className="card-header bg-danger">
        <span className="registration-title">{title}</span>
      </div>
      <div className="card-body">
        <OverlaySpinner loading={isLoading} />
        <h4 className="card-title text-danger">{selectedStart}</h4>
        {refundSlots.map((slot) => {
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
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, fontWeight: "bold" }}>Refund amount: ${refundAmount()}</div>
          <button className="btn btn-light mr-2" onClick={onBack}>
            Back
          </button>
          <button className="btn btn-light mr-2" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleRefund}>
            💸 Refund
          </button>
        </div>
      </div>
    </div>
  )
}

export default RefundInfo
