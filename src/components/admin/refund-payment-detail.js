import { CheckBox } from "components/field/check-box"

function RefundPaymentDetail({ paymentDetail, onSelect }) {
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

export { RefundPaymentDetail }
