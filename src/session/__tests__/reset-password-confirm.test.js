import userEvent from "@testing-library/user-event"

import React from "react"

import * as faker from "faker"
import { ResetPasswordConfirmScreen } from "session/index"
import { act, deferred, renderSession, screen, waitFor } from "test/test-utils"

const mockNav = jest.fn()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNav,
  useParams: () => ({ uid: "ABC", token: "123" }),
}))

test("successful password reset", async () => {
  const { promise, resolve } = deferred()

  renderSession(<ResetPasswordConfirmScreen />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(() => {
    resolve()
    return promise
  })

  const new_password = faker.internet.password()
  const re_new_password = new_password

  userEvent.type(screen.getByLabelText("Password", { exact: true }), new_password)
  userEvent.type(screen.getByLabelText(/confirm password/i), re_new_password)
  userEvent.click(screen.getByRole("button"))

  await waitFor(() => expect(mockNav).toHaveBeenCalledWith("/session/reset-password/complete"))
})
