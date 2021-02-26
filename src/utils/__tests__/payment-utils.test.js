import { ClubEvent } from "models/club-event"
import { Payment } from "models/payment"
import { getTestEvent, TestEventType } from "test/data/test-events"
import { getAmountDue } from "utils/payment-utils"

const event = new ClubEvent(getTestEvent({ eventType: TestEventType.weeknight }))

test("calculates the amount due for a missing payment record", () => {
  const amountDue = getAmountDue(null, event.feeMap)
  expect(amountDue.subtotal).toBe(0)
  expect(amountDue.transactionFee.toFixed(2)).toBe("0.00")
  expect(amountDue.total.toFixed(2)).toBe("0.00")
})

test("calculates the amount due for an empty payment record", () => {
  const payment = new Payment({
    id: 0,
  })

  const amountDue = getAmountDue(payment, event.feeMap)
  expect(amountDue.subtotal).toBe(0)
  expect(amountDue.transactionFee.toFixed(2)).toBe("0.00")
  expect(amountDue.total.toFixed(2)).toBe("0.00")
})

test("calculates the amount due for a payment record", () => {
  const payment = new Payment({
    id: 0,
    event: event.id,
    user: 1,
    notification_type: "C",
    payment_details: [
      { event_fee: 5, registration_slot: 11 },
      { event_fee: 8, registration_slot: 11 },
    ],
  })

  const amountDue = getAmountDue(payment, event.feeMap)
  expect(amountDue.subtotal).toBe(10)
  expect(amountDue.transactionFee.toFixed(2)).toBe("0.61")
  expect(amountDue.total.toFixed(2)).toBe("10.61")
})

test("calculates the amount due for a payment record with multiple slots", () => {
  const payment = new Payment({
    id: 0,
    event: event.id,
    user: 1,
    notification_type: "C",
    payment_details: [
      { event_fee: 5, registration_slot: 11 },
      { event_fee: 8, registration_slot: 11 },
      { event_fee: 5, registration_slot: 12 },
      { event_fee: 9, registration_slot: 12 },
      { event_fee: 5, registration_slot: 13 },
    ],
  })

  const amountDue = getAmountDue(payment, event.feeMap)
  expect(amountDue.subtotal).toBe(25)
  expect(amountDue.transactionFee.toFixed(2)).toBe("1.06")
  expect(amountDue.total.toFixed(2)).toBe("26.06")
})
