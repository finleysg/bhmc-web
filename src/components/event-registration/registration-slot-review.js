import React from "react"

import * as colors from "styles/colors"

function PaymentDetailReview({ paymentDetail, fees }) {
  const fee = fees.find((fee) => fee.id === paymentDetail.eventFeeId)

  return (
    <div style={{ textAlign: "right", marginBottom: ".5rem" }}>
      {fee.name}: ${fee.amount.toFixed(2)}
    </div>
  )
}

function RegistrationSlotReview({ slot, paymentDetails, fees }) {
  return (
    <div
      key={slot.id}
      style={{
        display: "flex",
        marginBottom: ".5rem",
        padding: ".5rem",
        borderBottom: `1px dotted ${colors.gray200}`,
      }}
    >
      <div style={{ flex: 1, color: colors.teal }}>{slot.playerName}</div>
      <div style={{ flex: 1, textAlign: "right" }}>
        {paymentDetails &&
          paymentDetails
            .filter((detail) => detail.slotId === slot.id)
            .map((detail) => {
              return (
                <PaymentDetailReview
                  key={`${detail.slotId}-${detail.id}`}
                  paymentDetail={detail}
                  fees={fees}
                />
              )
            })}
      </div>
    </div>
  )
}

export default RegistrationSlotReview
