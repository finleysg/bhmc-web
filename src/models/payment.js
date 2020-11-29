// eslint-disable-next-line
const examplePaymentJson = {
  id: 1,
  event: 1,
  user: 1,
  payment_code: "pi_1HsE0uG3m1mtgUwuU9qyr4q3",
  payment_key: "pi_1HsE0uG3m1mtgUwuU9qyr4q3_secret_OO2OZ0x0Vri8Y9d87AxRVY7VO",
  notification_type: "R",
  confirmed: false,
  payment_details: [
    { id: 1, event_fee: 1, registration_slot: 511, payment: 1 },
    { id: 2, event_fee: 3, registration_slot: 511, payment: 1 },
  ],
}

function PaymentDetail(json) {
  this.obj = json
  this.id = json.id
  this.eventFeeId = json.event_fee
  this.slotId = json.registration_slot
  this.paymentId = json.payment
}

function Payment(json) {
  this.obj = json
  this.id = json.id
  this.eventId = json.event
  this.userId = json.user
  this.paymentCode = json.payment_code
  this.paymentKey = json.payment_key
  this.paymentAmount = json.payment_amount
  this.transactionFee = json.transaction_fee
  this.notificationType = json.notification_type
  this.confirmed = json.confirmed
  this.details =
    json && json.payment_details ? json.payment_details.map((f) => new PaymentDetail(f)) : []
}

export { Payment, PaymentDetail }
