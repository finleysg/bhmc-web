import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import React from "react"

import * as faker from "faker"
import { ResetPasswordConfirmForm } from "session/reset-password-confirm-form"
import { formSubmitSpy } from "test/test-utils"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ uid: "ABC", token: "123" }),
}))

test("submitting the reset password confirm form calls onSubmit", async () => {
  const handleSubmit = formSubmitSpy()

  render(<ResetPasswordConfirmForm onSubmit={handleSubmit} />)

  const newPassword = faker.internet.password()
  const reNewPassword = newPassword

  userEvent.type(screen.getByLabelText("Password", { exact: true }), newPassword)
  userEvent.type(screen.getByLabelText(/confirm password/i), reNewPassword)
  userEvent.click(screen.getByRole("button"))

  await screen.findByTitle("loading")

  expect(handleSubmit).toHaveBeenCalledWith({
    new_password: newPassword,
    re_new_password: reNewPassword,
    uid: "ABC",
    token: "123",
  })
})

test("submitting the login form with mismatched passwords fails validation", async () => {
  const handleSubmit = formSubmitSpy()

  render(<ResetPasswordConfirmForm onSubmit={handleSubmit} />)

  const newPassword = faker.internet.password()
  const reNewPassword = "bogus"

  userEvent.type(screen.getByLabelText("Password", { exact: true }), newPassword)
  userEvent.type(screen.getByLabelText(/confirm password/i), reNewPassword)
  userEvent.click(screen.getByRole("button"))

  await screen.findByText(/passwords must match/i)

  expect(handleSubmit).not.toHaveBeenCalled()
})
