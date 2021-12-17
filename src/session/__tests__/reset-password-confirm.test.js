import userEvent from "@testing-library/user-event"

import React from "react"

import * as faker from "faker"
import { ResetPasswordConfirmScreen } from "session/index"
import { renderSession, screen, waitFor, waitForLoadingToFinish } from "test/test-utils"

const mockNav = jest.fn()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNav,
  useParams: () => ({ uid: "ABC", token: "123" }),
}))

test("successful password reset", async () => {

  renderSession(<ResetPasswordConfirmScreen />)

  await waitForLoadingToFinish()
  
  const newPassword = faker.internet.password()
  const reNewPassword = newPassword

  userEvent.type(screen.getByLabelText("Password", { exact: true }), newPassword)
  userEvent.type(screen.getByLabelText(/confirm password/i), reNewPassword)
  userEvent.click(screen.getByRole("button"))

  await waitFor(() => expect(mockNav).toHaveBeenCalledWith("/session/reset-password/complete"))
})
