import userEvent from "@testing-library/user-event"

import React from "react"

import Player from "models/player"
import { buildPlayer } from "test/data/account"
import { buildUserWithToken } from "test/data/auth"
import { formSubmitSpy, render, screen, waitFor, waitForLoadingToFinish } from "test/test-utils"

import { PlayerForm } from "../player-form"

test("player form happy path", async () => {
  const close = jest.fn(() => Promise.resolve({}))
  const user = buildUserWithToken()
  const player = new Player(
    buildPlayer({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    }),
  )

  render(<PlayerForm player={player.obj} onClose={close} />, { user })

  await waitForLoadingToFinish()

  // perform an update
  userEvent.clear(screen.getByRole("textbox", { name: /ghin/i }))
  userEvent.type(screen.getByRole("textbox", { name: /ghin/i }), "1234567")
  userEvent.click(screen.getByRole("button", { name: /save/i }))

  await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument()) // the toast
  await waitFor(() => expect(close).toHaveBeenCalledTimes(1))
})

test("submitting the player form when it fails validation", async () => {
  const close = formSubmitSpy()
  const user = buildUserWithToken()
  const player = new Player(
    buildPlayer({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    }),
  )

  render(<PlayerForm player={player.obj} onClose={close} />, { user })

  await waitForLoadingToFinish()

  // perform an invalid update
  userEvent.clear(screen.getByRole("textbox", { name: /email/i }))
  userEvent.type(screen.getByRole("textbox", { name: /email/i }), "not valid")
  userEvent.click(screen.getByRole("button", { name: /save/i }))

  await screen.findByText(/invalid email address/i)

  expect(close).not.toHaveBeenCalled()
})
