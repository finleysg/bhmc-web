import userEvent from "@testing-library/user-event"

import React from "react"

import * as faker from "faker"
import { ResetPasswordScreen } from "session/reset-password-screen"
import { act, deferred, renderSession, screen, waitFor } from "test/test-utils"

const mockNav = jest.fn()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNav,
}))

test("successful reset request", async () => {
  const { promise, resolve } = deferred()

  renderSession(<ResetPasswordScreen />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(() => {
    resolve()
    return promise
  })

  const email = faker.internet.email()

  userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  userEvent.click(screen.getByRole("button"))

  await waitFor(() => expect(mockNav).toHaveBeenCalledWith("/session/reset-password/sent"))
})
