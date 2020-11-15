import React from "react"

import moment from "moment"
import { renderWithRouter, screen } from "test/test-utils"
import { ClubEvent } from "utils/club-event-utils"

import { CalendarDay } from "../calendar-day"
import { Day } from "../calendar-utils"

test("conditionally renders an empty date", () => {
  const day = new Day(moment("2020-11-15"))

  renderWithRouter(<CalendarDay day={day} currentMonthNbr={10} />)

  expect(screen.getByRole("listitem")).toHaveClass("hidden-xs-down")
})

test("always renders a date with an event", () => {
  const day = new Day(moment("2020-11-15"))
  day.events.push(
    new ClubEvent({
      id: 1,
      name: "event 1",
      start_date: moment("2020-11-15"),
      rounds: 1,
    }),
  )

  renderWithRouter(<CalendarDay day={day} currentMonthNbr={10} />)

  expect(screen.getByRole("listitem")).not.toHaveClass("hidden-xs-down")
})

test("renders a date outside the current month with a special class", () => {
  const day = new Day(moment("2020-11-15"))

  renderWithRouter(<CalendarDay day={day} currentMonthNbr={9} />)

  expect(screen.getByRole("listitem")).toHaveClass("other-month")
})

test("renders the current date with a special class", () => {
  const day = new Day(moment())

  renderWithRouter(<CalendarDay day={day} currentMonthNbr={9} />)

  expect(screen.getByRole("listitem")).toHaveClass("today")
})

test("renders an internal link for club events", () => {
  const day = new Day(moment("2020-11-15"))
  day.events.push(
    new ClubEvent({
      id: 1,
      name: "2 Man Best Ball",
      start_date: moment("2020-11-15"),
      rounds: 1,
    }),
  )

  renderWithRouter(<CalendarDay day={day} currentMonthNbr={10} />)

  expect(screen.getByRole("link", { name: /2 man best ball/i })).toHaveAttribute(
    "href",
    "/event/2020-11-15/2-man-best-ball",
  )
})

test("renders an external url for non-club events", () => {
  const externalUrl = "https://mpga.net/tournaments/2020/four-ball"
  const day = new Day(moment("2020-11-15"))
  day.events.push(
    new ClubEvent({
      id: 1,
      name: "MPGA FourBall",
      start_date: moment("2020-11-15"),
      rounds: 2,
      external_url: externalUrl,
    }),
  )

  renderWithRouter(<CalendarDay day={day} currentMonthNbr={10} />)

  expect(screen.getByRole("link", { name: /mpga fourball/i })).toHaveAttribute("href", externalUrl)
})
