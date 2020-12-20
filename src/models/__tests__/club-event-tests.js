import { Payment } from "models/payment"
import moment from "moment"

import { ClubEvent } from "../club-event"

test("generates the correct event urls", () => {
  const event1 = new ClubEvent({
    id: 1,
    name: "2 Man Best Ball",
    start_date: moment("2020-10-03"),
  })
  expect(event1.eventUrl).toEqual("/event/2020-10-03/2-man-best-ball")

  const event2 = new ClubEvent({
    id: 2,
    name: "Individual LG/LN Test",
    start_date: moment("2020-10-03"),
  })
  expect(event2.eventUrl).toEqual("/event/2020-10-03/individual-lg-ln-test")

  const event3 = new ClubEvent({
    id: 3,
    name: "Individual LG / LN Test",
    start_date: moment("2020-10-03"),
  })
  expect(event3.eventUrl).toEqual("/event/2020-10-03/individual-lg-ln-test")

  const event4 = new ClubEvent({
    id: 4,
    name: "Red, White & Blue",
    start_date: moment("2020-10-03"),
  })
  expect(event4.eventUrl).toEqual("/event/2020-10-03/red-white-blue")
})

test("spreads multi-day events by determining an end date", () => {
  const event1 = new ClubEvent({
    id: 1,
    name: "2 Man Best Ball",
    start_date: moment("2020-10-03"),
    rounds: 1,
  })
  expect(event1.startDate.isSame(event1.endDate)).toBe(true)

  const event2 = new ClubEvent({
    id: 2,
    name: "2 Man Best Ball",
    start_date: moment("2020-10-03"),
    rounds: 2,
  })
  expect(event2.startDate.isSame(event2.endDate)).toBe(false)
  expect(event2.startDate.isBefore(event2.endDate)).toBe(true)
})

test("selectedFees: returns no fees when payment is undefined", () => {
  const event1 = new ClubEvent({
    id: 1,
    name: "Test Event",
    fees: [
      {
        id: 1,
        fee_type: { id: 1, name: "Fee 1" },
        is_required: true,
      },
      {
        id: 2,
        fee_type: { id: 2, name: "Fee 2" },
        is_required: false,
      },
      {
        id: 3,
        fee_type: { id: 3, name: "Fee 3" },
        is_required: false,
      },
    ],
  })
  const result = event1.selectedFees(undefined)
  expect(result).toEqual([])
})

test("selectedFees: returns no fees when payment has no fees", () => {
  const event1 = new ClubEvent({
    id: 1,
    name: "Test Event",
    fees: [
      {
        id: 1,
        fee_type: { id: 1, name: "Fee 1" },
        is_required: true,
      },
      {
        id: 2,
        fee_type: { id: 2, name: "Fee 2" },
        is_required: false,
      },
      {
        id: 3,
        fee_type: { id: 3, name: "Fee 3" },
        is_required: false,
      },
    ],
  })
  const payment = new Payment({})
  const result = event1.selectedFees(payment)
  expect(result).toEqual([])
})

test("selectedFees: returns selected optional fees", () => {
  const event1 = new ClubEvent({
    id: 1,
    name: "Test Event",
    fees: [
      {
        id: 1,
        fee_type: { id: 1, name: "Fee 1" },
        is_required: true,
      },
      {
        id: 2,
        fee_type: { id: 2, name: "Fee 2" },
        is_required: false,
      },
      {
        id: 3,
        fee_type: { id: 3, name: "Fee 3" },
        is_required: false,
      },
    ],
  })
  const payment = new Payment({
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
  })
  const result = event1.selectedFees(payment)
  expect(result.length).toEqual(1)
  expect(result[0].id).toEqual(3)
})
