import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import React from "react"

import * as faker from "faker"
import { ResetPasswordConfirmForm } from "screens/session/reset-password-confirm-form"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ uid: "ABC", token: "123" }),
}))

test("submitting the reset password confirm form calls onSubmit", async () => {
  const promise = Promise.resolve({})
  const handleSubmit = jest.fn(() => promise)

  render(<ResetPasswordConfirmForm onSubmit={handleSubmit} />)

  const new_password = faker.internet.password()
  const re_new_password = new_password

  userEvent.type(screen.getByLabelText("Password", { exact: true }), new_password)
  userEvent.type(screen.getByLabelText(/confirm password/i), re_new_password)
  userEvent.click(screen.getByRole("button"))

  await screen.findByTitle("loading")

  expect(handleSubmit).toHaveBeenCalledWith({ new_password, re_new_password, uid: "ABC", token: "123" })
})

test("submitting the login form with mismatched passwords fails validation", async () => {
  const promise = Promise.resolve({})
  const handleSubmit = jest.fn(() => promise)

  render(<ResetPasswordConfirmForm onSubmit={handleSubmit} />)

  const new_password = faker.internet.password()
  const re_new_password = "bogus"

  userEvent.type(screen.getByLabelText("Password", { exact: true }), new_password)
  userEvent.type(screen.getByLabelText(/confirm password/i), re_new_password)
  userEvent.click(screen.getByRole("button"))

  await screen.findByText(/passwords must match/i)

  expect(handleSubmit).not.toHaveBeenCalled()
})
