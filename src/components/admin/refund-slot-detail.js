import { RefundPaymentDetail } from "./refund-payment-detail"

function RefundSlotDetail({ slot, onSelect }) {
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
          return <RefundPaymentDetail key={`${fee.id}`} paymentDetail={fee} onSelect={onSelect} />
        })}
      </div>
    </div>
  )
}

export { RefundSlotDetail }
