import React from "react"

import { addDays, parseISO, subDays } from "date-fns"
import { ClubEvent } from "models/club-event"
import { screen, simpleRender } from "test/test-utils"

import { CalendarDay } from "../calendar-day"
import { Day } from "../calendar-utils"

test("conditionally renders an empty date", () => {
  const day = new Day(parseISO("2020-11-15"))

  simpleRender(<CalendarDay day={day} currentMonthNbr={10} />)

  expect(screen.getByRole("listitem")).toHaveClass("hidden-xs-down")
})

test("always renders a date with an event", () => {
  const day = new Day(parseISO("2020-11-15"))
  day.events.push(
    new ClubEvent({
      id: 11,
      name: "event 1",
      start_date: "2020-11-15",
      signup_start: subDays(new Date("2020-11-15"), 1).toISOString(),
      signup_end: addDays(new Date("2020-11-15"), 7).toISOString(),
      rounds: 1,
    }),
  )

  simpleRender(<CalendarDay day={day} currentMonthNbr={10} />)

  expect(screen.getByRole("listitem")).not.toHaveClass("hidden-xs-down")
})

test("renders a date outside the current month with a special class", () => {
  const day = new Day(parseISO("2020-11-15"))

  simpleRender(<CalendarDay day={day} currentMonthNbr={9} />)

  expect(screen.getByRole("listitem")).toHaveClass("other-month")
})

test("renders the current date with a special class", () => {
  const day = new Day(new Date())

  simpleRender(<CalendarDay day={day} currentMonthNbr={9} />)

  expect(screen.getByRole("listitem")).toHaveClass("today")
})

test("renders an internal link for club events", () => {
  const day = new Day(parseISO("2020-11-15"))
  day.events.push(
    new ClubEvent({
      id: 11,
      name: "2 Man Best Ball",
      start_date: "2020-11-15",
      signup_start: subDays(new Date("2020-11-15"), 1).toISOString(),
      signup_end: addDays(new Date("2020-11-15"), 7).toISOString(),
      rounds: 1,
    }),
  )

  simpleRender(<CalendarDay day={day} currentMonthNbr={10} />)

  expect(screen.getByRole("link", { name: /2 man best ball/i })).toHaveAttribute(
    "href",
    "/event/2020-11-15/2-man-best-ball",
  )
})

test("overrides the link to the season event", () => {
  const day = new Day(parseISO("2020-11-15"))
  day.events.push(
    new ClubEvent({
      id: 1,
      name: "Season Sign Up",
      start_date: "2020-11-15",
      signup_start: subDays(new Date("2020-11-15"), 1).toISOString(),
      signup_end: addDays(new Date("2020-11-15"), 7).toISOString(),
      rounds: 1,
    }),
  )

  simpleRender(<CalendarDay day={day} currentMonthNbr={10} />)

  expect(screen.getByRole("link", { name: /season sign up/i })).toHaveAttribute(
    "href",
    "/membership",
  )
})

test("overrides the link to the match play event", () => {
  const day = new Day(parseISO("2020-11-15"))
  day.events.push(
    new ClubEvent({
      id: 2,
      name: "Season Long Match Play",
      start_date: "2020-11-15",
      signup_start: subDays(new Date("2020-11-15"), 1).toISOString(),
      signup_end: addDays(new Date("2020-11-15"), 7).toISOString(),
      rounds: 1,
    }),
  )

  simpleRender(<CalendarDay day={day} currentMonthNbr={10} />)

  expect(screen.getByRole("link", { name: /season long match play/i })).toHaveAttribute(
    "href",
    "/match-play",
  )
})

test("renders an external url for non-club events", () => {
  const externalUrl = "https://mpga.net/tournaments/2020/four-ball"
  const day = new Day(parseISO("2020-11-15"))
  day.events.push(
    new ClubEvent({
      id: 11,
      name: "MPGA FourBall",
      start_date: "2020-11-15",
      signup_start: subDays(new Date("2020-11-15"), 1).toISOString(),
      signup_end: addDays(new Date("2020-11-15"), 7).toISOString(),
      rounds: 2,
      external_url: externalUrl,
    }),
  )

  simpleRender(<CalendarDay day={day} currentMonthNbr={10} />)

  expect(screen.getByRole("link", { name: /mpga fourball/i })).toHaveAttribute("href", externalUrl)
})
