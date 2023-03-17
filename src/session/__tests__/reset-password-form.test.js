import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import * as faker from "faker"
import { ResetPasswordForm } from "session/reset-password-form"
import { formSubmitSpy } from "test/test-utils"

test("submitting the reset form calls onSubmit with email", async () => {
  const handleSubmit = formSubmitSpy()

  render(<ResetPasswordForm onSubmit={handleSubmit} />)

  const email = faker.internet.email()

  await userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  await userEvent.click(screen.getByRole("button"))

  expect(handleSubmit).toHaveBeenCalledWith({
    email,
  })
})

test("submitting the login form without an email fails validation", async () => {
  const handleSubmit = formSubmitSpy()

  render(<ResetPasswordForm onSubmit={handleSubmit} />)

  await userEvent.click(screen.getByRole("button"))

  await screen.findByText(/a valid email is required/i)

  expect(handleSubmit).not.toHaveBeenCalled()
})

test("submitting the login form with an invalid email fails validation", async () => {
  const handleSubmit = formSubmitSpy()

  render(<ResetPasswordForm onSubmit={handleSubmit} />)

  const email = "bogus"

  await userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  await userEvent.click(screen.getByRole("button"))

  await screen.findByText(/invalid email address/i)

  expect(handleSubmit).not.toHaveBeenCalled()
})
