import { ClubEvent } from "models/club-event"
import { buildShotgunSlots, buildTeetimeSlots } from "test/data/registration-slots"
import { getTestEvent, TestEventType } from "test/data/test-events"

import { LoadReserveTables } from "../reserve"

test("builds teetime tables for weeknight event using default splits", () => {
  const clubEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.weeknight }))
  const eastSlots = buildTeetimeSlots(clubEvent.id, 1, 5, 5)
  const northSlots = buildTeetimeSlots(clubEvent.id, 10, 5, 5)
  const westSlots = buildTeetimeSlots(clubEvent.id, 19, 5, 5)
  clubEvent.totalGroups = 5
  clubEvent.startTime = "2:30 PM"

  const tables = LoadReserveTables(clubEvent, [...eastSlots, ...northSlots, ...westSlots])

  expect(tables.length).toBe(3)
  expect(tables[0].groups.length).toBe(5)
  expect(tables[0].groups[0].slots.length).toBe(5)
  expect(tables[0].groups[0].name).toEqual("2:30 PM")
  expect(tables[0].groups[1].name).toEqual("2:38 PM")
  expect(tables[0].groups[2].name).toEqual("2:46 PM")
  expect(tables[0].groups[3].name).toEqual("2:54 PM")
  expect(tables[0].groups[4].name).toEqual("3:02 PM")
})

test("builds teetime tables based on splits in the event settings", () => {
  const clubEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.weeknight }))
  clubEvent.teeTimeSplits = "10"
  const eastSlots = buildTeetimeSlots(clubEvent.id, 1, 5, 5)
  const northSlots = buildTeetimeSlots(clubEvent.id, 10, 5, 5)
  const westSlots = buildTeetimeSlots(clubEvent.id, 19, 5, 5)
  clubEvent.totalGroups = 5
  clubEvent.startTime = "2:30 PM"

  const tables = LoadReserveTables(clubEvent, [...eastSlots, ...northSlots, ...westSlots])

  expect(tables.length).toBe(3)
  expect(tables[0].groups.length).toBe(5)
  expect(tables[0].groups[0].slots.length).toBe(5)
  expect(tables[0].groups[0].name).toEqual("2:30 PM")
  expect(tables[0].groups[1].name).toEqual("2:40 PM")
  expect(tables[0].groups[2].name).toEqual("2:50 PM")
  expect(tables[0].groups[3].name).toEqual("3:00 PM")
  expect(tables[0].groups[4].name).toEqual("3:10 PM")
})

test("builds teetime tables for alternating splits", () => {
  const clubEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.weeknight }))
  clubEvent.teeTimeSplits = "8,9"
  const eastSlots = buildTeetimeSlots(clubEvent.id, 1, 5, 5)
  const northSlots = buildTeetimeSlots(clubEvent.id, 10, 5, 5)
  const westSlots = buildTeetimeSlots(clubEvent.id, 19, 5, 5)
  clubEvent.totalGroups = 5
  clubEvent.startTime = "2:30 PM"

  const tables = LoadReserveTables(clubEvent, [...eastSlots, ...northSlots, ...westSlots])

  expect(tables.length).toBe(3)
  expect(tables[0].groups.length).toBe(5)
  expect(tables[0].groups[0].slots.length).toBe(5)
  expect(tables[0].groups[0].name).toEqual("2:30 PM")
  expect(tables[0].groups[1].name).toEqual("2:38 PM")
  expect(tables[0].groups[2].name).toEqual("2:47 PM")
  expect(tables[0].groups[3].name).toEqual("2:55 PM")
  expect(tables[0].groups[4].name).toEqual("3:04 PM")
})

test("builds shotgun tables for weeknight event", () => {
  const clubEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.shotgun }))
  const eastSlots = buildShotgunSlots(clubEvent.id, 1, 18, 5)
  const northSlots = buildShotgunSlots(clubEvent.id, 10, 18, 5)
  const westSlots = buildShotgunSlots(clubEvent.id, 19, 18, 5)

  const tables = LoadReserveTables(clubEvent, [...eastSlots, ...northSlots, ...westSlots])

  expect(tables.length).toBe(3)
  expect(tables[0].groups.length).toBe(18)
  expect(tables[0].groups[0].slots.length).toBe(5)
  expect(tables[0].groups[0].name).toEqual("1A")
  expect(tables[0].groups[1].name).toEqual("1B")
  expect(tables[0].groups[2].name).toEqual("2A")
  expect(tables[0].groups[3].name).toEqual("2B")
  expect(tables[0].groups[4].name).toEqual("3A")
})
