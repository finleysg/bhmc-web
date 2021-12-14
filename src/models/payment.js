import { immerable } from "immer"

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

// eslint-disable-next-line
const examplePaymentMethodResponse = {
  object: "list",
  data: [
    {
      id: "pm_1I0CfkG3m1mtgUwueGwNG6t2",
      object: "payment_method",
      billing_details: {
        address: {
          city: null,
          country: null,
          line1: null,
          line2: null,
          postal_code: "24242",
          state: null,
        },
        email: "comfy.j.alan@test.com",
        name: "Alan Finley",
        phone: null,
      },
      card: {
        brand: "visa",
        checks: { address_line1_check: null, address_postal_code_check: "pass", cvc_check: "pass" },
        country: "US",
        exp_month: 4,
        exp_year: 2024,
        fingerprint: "uExRHwbYpPHqngtS",
        funding: "credit",
        generated_from: null,
        last4: "4242",
        networks: { available: ["visa"], preferred: null },
        three_d_secure_usage: { supported: true },
        wallet: null,
      },
      created: 1608412144,
      customer: "cus_IbPUv80MDzWm7g",
      livemode: false,
      metadata: {},
      type: "card",
    },
  ],
  has_more: false,
  url: "/v1/payment_methods",
}

function SavedCard(json) {
  this.paymentMethod = json.id
  this.name = json.billing_details.name
  this.brand = json.card.brand
  this.last4 = json.card.last4
  this.card = `${json.card.brand} ending in ${json.card.last4}`
  this.expires = `${json.card.exp_month}/${json.card.exp_year}`
  this.isExpired = false
}

function PaymentDetail(json) {
  this[immerable] = true
  this.obj = json
  this.id = json.id
  this.eventFeeId = json.event_fee
  this.slotId = json.registration_slot
  this.paymentId = json.payment
}

function Payment(json) {
  this[immerable] = true
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
  this.details = json && json.payment_details ? json.payment_details.map((f) => new PaymentDetail(f)) : []
  this.edits = []

  /**
   * Returns true if there are complete payment details
   */
  this.hasPaymentDetails = () => {
    return (
      this !== undefined && this.id !== undefined && this.details[0] !== undefined && this.details[0].id !== undefined
    )
  }
}

export { Payment, PaymentDetail, SavedCard }
