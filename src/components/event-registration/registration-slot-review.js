import * as colors from "styles/colors"

function PaymentDetailReview({ paymentDetail, fees }) {
  const fee = fees.find((fee) => fee.id === paymentDetail.eventFeeId)

  return (
    <div style={{ textAlign: "right", marginBottom: ".5rem" }}>
      {fee.name}: ${fee.amount.toFixed(2)}
    </div>
  )
}

function RegistrationSlotReview({ slot, team, paymentDetails, fees }) {
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
      <div style={{ flex: 1, color: colors.teal }}>
        <span className="text-teal">{slot.playerName}</span>
        {team > 0 && (
          <span style={{ marginLeft: "1rem", fontWeight: "bold" }} className="text-muted">
            Team {team}
          </span>
        )}
      </div>
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
