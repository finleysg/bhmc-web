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
