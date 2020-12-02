import React from "react"

import { useEventRegistration } from "context/registration-context"
import * as hooks from "features/account/account-hooks"
import Player from "models/player"
import { buildPlayer } from "test/generate/account"
import { buildUserWithToken } from "test/generate/auth"
import { currentSeasonRegistration } from "test/generate/season-registration"
import {
  act,
  deferred,
  renderForEventRegistration,
  screen,
  waitForLoadingToFinish,
} from "test/test-utils"

import SeasonEvent from "../season-event"

// Our authenticated user/player
const user = buildUserWithToken({ id: 1 })
const player = new Player(
  buildPlayer({
    id: 1,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  }),
)

function Wrapper(props) {
  const { loadEvent } = useEventRegistration()
  React.useEffect(() => {
    loadEvent(1)
  }, [loadEvent])
  return <SeasonEvent {...props} />
}

test("displays some player info if player can register", async () => {
  const { promise, resolve } = deferred()

  jest.spyOn(hooks, "useMyEvents").mockImplementation(() => [])
  jest.spyOn(hooks, "usePlayer").mockImplementation(() => player.obj)

  renderForEventRegistration(<Wrapper canStart={true} onStart={jest.fn()} />, { user })

  await act(() => {
    resolve()
    return promise
  })

  await waitForLoadingToFinish()

  expect(screen.getByTestId("player-info")).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /register online/i })).toBeInTheDocument()
})

test.skip("does not display player info if player has already registered", async () => {
  const { promise, resolve } = deferred()

  jest.spyOn(hooks, "useMyEvents").mockImplementation(() => [currentSeasonRegistration])
  jest.spyOn(hooks, "usePlayer").mockImplementation(() => player.obj)

  renderForEventRegistration(<Wrapper canStart={true} onStart={jest.fn()} />, { user })

  await act(() => {
    resolve()
    return promise
  })

  await waitForLoadingToFinish()

  expect(screen.getByTestId("player-info")).not.toBeInTheDocument()
  expect(screen.getByRole("button", { name: /register online/i })).not.toBeInTheDocument()
})
