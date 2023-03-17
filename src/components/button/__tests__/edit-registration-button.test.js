import { ClubEvent } from "models/club-event"
import { buildPlayer } from "test/data/account"
import { buildUser, buildUserWithToken } from "test/data/auth"
import { getTestEvent, TestEventType } from "test/data/test-events"
import {
  renderWithEventRegistration,
  screen,
  testingQueryClient,
  waitForLoadingToFinish,
} from "test/test-utils"

import { EditRegistrationButton } from "../edit-registration-button"

beforeEach(() => {
  testingQueryClient.clear()
})

test("renders the button if sign-ups have started and user is registered", async () => {
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

  const testEvent = new ClubEvent(
    getTestEvent({ eventType: TestEventType.season, state: "registration" }),
  )

  renderWithEventRegistration(
    <div>
      <EditRegistrationButton clubEvent={testEvent} hasSignedUp={true} onClick={jest.fn()} />
    </div>,
    { user },
  )

  await screen.findByRole("button")
})

test("does not render the button if registration as not started", async () => {
  const user = buildUser()

  const testEvent = new ClubEvent(
    getTestEvent({ eventType: TestEventType.shotgun, state: "future" }),
  )
  renderWithEventRegistration(
    <div>
      <EditRegistrationButton clubEvent={testEvent} onClick={jest.fn()} />
    </div>,
    {
      user,
    },
  )

  expect(screen.queryByRole("button")).not.toBeInTheDocument()
  await waitForLoadingToFinish()
})

test("does not render the button if there is no registration", async () => {
  const user = buildUser()

  const testEvent = new ClubEvent(getTestEvent({ eventType: TestEventType.deadline }))

  renderWithEventRegistration(
    <div>
      <EditRegistrationButton clubEvent={testEvent} onClick={jest.fn()} />
    </div>,
    {
      user,
    },
  )

  expect(screen.queryByRole("button")).not.toBeInTheDocument()
  await waitForLoadingToFinish()
})
