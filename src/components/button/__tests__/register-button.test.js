import React from "react"

import { RegistrationSteps } from "context/registration-context"
import { format } from "date-fns"
import { ClubEvent } from "models/club-event"
import { buildPlayer } from "test/data/account"
import { buildUserWithToken } from "test/data/auth"
import { getTestEvent, TestEventType } from "test/data/test-events"
import { rest, server } from "test/test-server"
import { renderWithEventRegistration, screen, testingQueryClient, waitFor } from "test/test-utils"
import { apiUrl } from "utils/client-utils"

import { RegisterButton } from "../register-button"

const existingRegistrations = [
  {
    id: 1,
    event: 1,
    hole: null,
    registration: 1,
    starting_order: 0,
    slot: 0,
    status: "R",
    player: 1,
  },
  {
    id: 2,
    event: 2,
    hole: null,
    registration: 2,
    starting_order: 0,
    slot: 0,
    status: "R",
    player: 1,
  },
  {
    id: 3,
    event: 3,
    hole: null,
    registration: 3,
    starting_order: 0,
    slot: 0,
    status: "R",
    player: 1,
  },
]

beforeEach(() => {
  testingQueryClient.clear()
})

test("renders the button for an authenticated user in the season sign-up event", async () => {
  const user = buildUserWithToken()
  const player = buildPlayer({
    overrides: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: 1,
    },
  })

  testingQueryClient.setQueryData("player", player)

  server.use(
    rest.get(apiUrl("registration-slots"), async (req, res, ctx) => {
      return res(ctx.status(200), [])
    }),
  )

  const testEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.season, state: "registration" }))

  renderWithEventRegistration(
    <RegisterButton
      clubEvent={testEvent}
      hasSignedUp={false}
      isMember={false}
      currentStep={RegistrationSteps.Pending}
      onClick={jest.fn()}
    />,
    { user: user },
  )

  await waitFor(() => expect(screen.queryByRole("button")).toBeInTheDocument())
})

test("renders null for an authenticated user who has already signed up for the season sign-up event", async () => {
  const user = buildUserWithToken()
  const player = buildPlayer({
    overrides: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: 1,
    },
  })

  testingQueryClient.setQueryData("player", player)

  server.use(
    rest.get(apiUrl("registration-slots"), async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(existingRegistrations))
    }),
  )

  const testEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.season, state: "registration" }))

  renderWithEventRegistration(
    <RegisterButton
      clubEvent={testEvent}
      hasSignedUp={true}
      isMember={true}
      currentStep={RegistrationSteps.Pending}
      onClick={jest.fn()}
    />,
    { user: user },
  )

  await waitFor(() => expect(screen.queryByRole("button")).not.toBeInTheDocument())
})

test("renders the button for a member and a weeknight event", async () => {
  const user = buildUserWithToken()
  const player = buildPlayer({
    overrides: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: 1,
    },
  })

  testingQueryClient.setQueryData("player", player)

  server.use(
    rest.get(apiUrl("registration-slots"), async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(existingRegistrations))
    }),
  )

  const testEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.weeknight, state: "registration" }))

  renderWithEventRegistration(
    <RegisterButton
      clubEvent={testEvent}
      hasSignedUp={false}
      isMember={true}
      currentStep={RegistrationSteps.Pending}
      onClick={jest.fn()}
    />,
    { user: user },
  )

  await waitFor(() => expect(screen.queryByRole("button")).toBeInTheDocument())
})

test("renders null for a non-member and a weeknight event", async () => {
  const user = buildUserWithToken()
  const player = buildPlayer({
    overrides: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: 1,
    },
  })

  testingQueryClient.setQueryData("player", player)

  server.use(
    rest.get(apiUrl("registration-slots"), async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]))
    }),
  )

  const testEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.weeknight, state: "registration" }))

  renderWithEventRegistration(
    <RegisterButton
      clubEvent={testEvent}
      hasSignedUp={false}
      isMember={false}
      currentStep={RegistrationSteps.Pending}
      onClick={jest.fn()}
    />,
    { user: user },
  )

  await waitFor(() => expect(screen.queryByRole("button")).not.toBeInTheDocument())
})

test("renders null for a member and a weeknight event in the future", async () => {
  const user = buildUserWithToken()
  const player = buildPlayer({
    overrides: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: 1,
    },
  })

  testingQueryClient.setQueryData("player", player)

  server.use(
    rest.get(apiUrl("registration-slots"), async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(existingRegistrations))
    }),
  )

  const testEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.weeknight, state: "future" }))

  renderWithEventRegistration(
    <RegisterButton
      clubEvent={testEvent}
      hasSignedUp={false}
      isMember={true}
      currentStep={RegistrationSteps.Pending}
      onClick={jest.fn()}
    />,
    { user: user },
  )

  await waitFor(() => expect(screen.queryByRole("button")).not.toBeInTheDocument())
})

test("renders null for a member and a weeknight event in the past", async () => {
  const user = buildUserWithToken()
  const player = buildPlayer({
    overrides: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: 1,
    },
  })

  testingQueryClient.setQueryData("player", player)

  server.use(
    rest.get(apiUrl("registration-slots"), async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(existingRegistrations))
    }),
  )

  const testEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.weeknight, state: "past" }))

  renderWithEventRegistration(
    <RegisterButton
      clubEvent={testEvent}
      hasSignedUp={false}
      isMember={true}
      currentStep={RegistrationSteps.Pending}
      onClick={jest.fn()}
    />,
    { user: user },
  )

  await waitFor(() => expect(screen.queryByRole("button")).not.toBeInTheDocument())
})

test("renders the button for a non-member and an open event", async () => {
  const user = buildUserWithToken()
  const player = buildPlayer({
    overrides: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: 1,
    },
  })

  testingQueryClient.setQueryData("player", player)

  server.use(
    rest.get(apiUrl("registration-slots"), async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]))
    }),
  )

  const testEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.open, state: "registration" }))

  renderWithEventRegistration(
    <RegisterButton
      clubEvent={testEvent}
      hasSignedUp={false}
      isMember={false}
      currentStep={RegistrationSteps.Pending}
      onClick={jest.fn()}
    />,
    { user: user },
  )

  await waitFor(() => expect(screen.queryByRole("button")).toBeInTheDocument())
})

test("renders null for a non-member without a ghin and an open event", async () => {
  const user = buildUserWithToken()
  const player = buildPlayer({
    overrides: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: 1,
    },
  })
  player.ghin = "" // fake data bot doesn't support this override

  testingQueryClient.setQueryData("player", player)

  server.use(
    rest.get(apiUrl("registration-slots"), async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]))
    }),
  )

  const testEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.open, state: "registration" }))

  renderWithEventRegistration(
    <RegisterButton
      clubEvent={testEvent}
      hasSignedUp={false}
      isMember={false}
      currentStep={RegistrationSteps.Pending}
      onClick={jest.fn()}
    />,
    { user: user },
  )

  await waitFor(() => expect(screen.queryByRole("button")).not.toBeInTheDocument())
})

test("renders null for a non-member and a member-guest event", async () => {
  const user = buildUserWithToken()
  const player = buildPlayer({
    overrides: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: 1,
    },
  })

  testingQueryClient.setQueryData("player", player)

  server.use(
    rest.get(apiUrl("registration-slots"), async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]))
    }),
  )

  const testEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.guest, state: "registration" }))

  renderWithEventRegistration(
    <RegisterButton
      clubEvent={testEvent}
      hasSignedUp={false}
      isMember={false}
      currentStep={RegistrationSteps.Pending}
      onClick={jest.fn()}
    />,
    { user: user },
  )

  await waitFor(() => expect(screen.queryByRole("button")).not.toBeInTheDocument())
})

test("renders null for an event without registration", async () => {
  const user = buildUserWithToken()
  const player = buildPlayer({
    overrides: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: 1,
    },
  })

  testingQueryClient.setQueryData("player", player)

  server.use(
    rest.get(apiUrl("registration-slots"), async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(existingRegistrations))
    }),
  )

  const testEvent = new ClubEvent({
    id: 11,
    name: "Meeting",
    start_date: format(new Date(), "yyyy-MM-dd"),
    registration_type: "N",
  })

  renderWithEventRegistration(
    <RegisterButton
      clubEvent={testEvent}
      hasSignedUp={false}
      isMember={true}
      currentStep={RegistrationSteps.Pending}
      onClick={jest.fn()}
    />,
    { user: user },
  )

  await waitFor(() => expect(screen.queryByRole("button")).not.toBeInTheDocument())
})
