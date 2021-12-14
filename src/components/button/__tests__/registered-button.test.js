import React from "react"

import { ClubEvent } from "models/club-event"
import { buildUser } from "test/data/auth"
import { getTestEvent, TestEventType } from "test/data/test-events"
import { renderWithEventRegistration, screen, testingQueryClient, waitFor } from "test/test-utils"

import { RegisteredButton } from "../registered-button"

beforeEach(() => {
  testingQueryClient.clear()
})

test("renders the button if sign-ups have started", async () => {
  const testEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.shotgun, state: "registration" }))

  renderWithEventRegistration(<RegisteredButton clubEvent={testEvent} onClick={jest.fn()} />, {
    user: {},
  })

  await waitFor(() => expect(screen.queryByRole("link", { name: /👀 registered/i })).toBeInTheDocument())
})

test("does not render the button if registration as not started", async () => {
  const user = buildUser()

  const testEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.shotgun, state: "future" }))
  renderWithEventRegistration(<RegisteredButton clubEvent={testEvent} onClick={jest.fn()} />, {
    user: user,
  })

  await waitFor(() => expect(screen.queryByRole("link", { name: /👀 registered/i })).not.toBeInTheDocument())
})

test("does not render the button if there is no registration", async () => {
  const user = buildUser()

  const testEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.deadline }))

  renderWithEventRegistration(<RegisteredButton clubEvent={testEvent} onClick={jest.fn()} />, {
    user: user,
  })

  await waitFor(() => expect(screen.queryByRole("link", { name: /👀 registered/i })).not.toBeInTheDocument())
})
