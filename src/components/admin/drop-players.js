import styled from "@emotion/styled/macro"
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogLabel,
} from "@reach/alert-dialog"

import React from "react"

import { CheckBox } from "components/field/check-box"
import { OverlaySpinner } from "components/spinners"
import { useClient } from "context/auth-context"
import { ReserveSlot } from "models/reserve"
import { useAsync } from "utils/use-async"

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

function PaymentDetail({ paymentDetail, onSelect }) {
  const handleChange = (e) => {
    onSelect({ paymentDetailId: paymentDetail.id, selected: e.target.checked })
  }

  const feeInfo = `${paymentDetail.eventFee.name}: $${paymentDetail.eventFee.amount.toFixed(2)}`
  const paidBy = `(paid by ${paymentDetail.paidBy})`

  return (
    <div style={{ marginBottom: ".5rem" }}>
      <CheckBox
        label={`${feeInfo} ${paidBy}`}
        checked={paymentDetail.selected}
        onChange={handleChange}
      />
    </div>
  )
}

function SlotDetail({ slot, onSelect }) {
  return (
    <div
      key={slot.id}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: ".5rem",
        padding: ".5rem",
      }}
    >
      <div style={{ flex: 1 }}>{slot.playerName}</div>
      <div style={{ flex: 3 }}>
        {slot.fees.map((fee) => {
          return <PaymentDetail key={`${fee.id}`} paymentDetail={fee} onSelect={onSelect} />
        })}
      </div>
    </div>
  )
}

const DropPlayersAlertDialog = styled(AlertDialog)({
  maxWidth: "560px",
})

function DropPlayers({ clubEvent, slots, dropRef, onDrop, onCancel }) {
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
    <DropPlayersAlertDialog leastDestructiveRef={dropRef}>
      <AlertDialogLabel>
        <h4 className="text-danger">Drop Players</h4>
      </AlertDialogLabel>
      <AlertDialogDescription style={{ padding: "1rem 0" }}>
        <div className="card border border-danger">
          <div className="card-body">
            <OverlaySpinner loading={isLoading} />
            {dropSlots.map((slot) => {
              return <SlotDetail key={slot.id} slot={slot} onSelect={handleSelect} />
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
      </AlertDialogDescription>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, fontWeight: "bold" }}>Refund amount: ${refundAmount()}</div>
        <button className="btn btn-light mr-2" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleDrop}>
          Confirm Drop
        </button>
      </div>
    </DropPlayersAlertDialog>
  )
}

export default DropPlayers
