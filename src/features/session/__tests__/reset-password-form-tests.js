import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import React from "react"

import * as faker from "faker"
import { ResetPasswordForm } from "features/session/reset-password-form"

test("submitting the reset form calls onSubmit with email", async () => {
  const promise = Promise.resolve({})
  const handleSubmit = jest.fn(() => promise)

  render(<ResetPasswordForm onSubmit={handleSubmit} />)

  const email = faker.internet.email()

  userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  userEvent.click(screen.getByRole("button"))

  await screen.findByTitle("loading")

  expect(handleSubmit).toHaveBeenCalledWith({
    email,
  })
})

test("submitting the login form without an email fails validation", async () => {
  const promise = Promise.resolve({})
  const handleSubmit = jest.fn(() => promise)

  render(<ResetPasswordForm onSubmit={handleSubmit} />)

  userEvent.click(screen.getByRole("button"))

  await screen.findByText(/a valid email is required/i)

  expect(handleSubmit).not.toHaveBeenCalled()
})

test("submitting the login form with an invalid email fails validation", async () => {
  const promise = Promise.resolve({})
  const handleSubmit = jest.fn(() => promise)

  render(<ResetPasswordForm onSubmit={handleSubmit} />)

  const email = "bogus"

  userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  userEvent.click(screen.getByRole("button"))

  await screen.findByText(/invalid email address/i)

  expect(handleSubmit).not.toHaveBeenCalled()
})
