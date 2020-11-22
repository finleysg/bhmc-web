import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import React from "react"

import { LoginForm } from "features/session/login-form"
import { buildLoginForm } from "test/generate/auth"

test("submitting the login form calls onSubmit with email and password", async () => {
  const promise = Promise.resolve({})
  const handleSubmit = jest.fn(() => promise)

  render(<LoginForm onSubmit={handleSubmit} />)

  const { email, password } = buildLoginForm()

  userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole("button"))

  await screen.findByTitle("loading")

  expect(handleSubmit).toHaveBeenCalledWith({
    email,
    password,
  })
})

test("submitting the login form without a password fails validation", async () => {
  const promise = Promise.resolve({})
  const handleSubmit = jest.fn(() => promise)

  render(<LoginForm onSubmit={handleSubmit} />)

  const { email } = buildLoginForm()

  userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  userEvent.click(screen.getByRole("button"))

  await screen.findByText(/password is required/i)

  expect(handleSubmit).not.toHaveBeenCalled()
})

test("submitting the login form without an email fails validation", async () => {
  const promise = Promise.resolve({})
  const handleSubmit = jest.fn(() => promise)

  render(<LoginForm onSubmit={handleSubmit} />)

  const { password } = buildLoginForm()

  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole("button"))

  await screen.findByText(/a valid email is required/i)

  expect(handleSubmit).not.toHaveBeenCalled()
})

test("submitting the login form with an invalid email fails validation", async () => {
  const promise = Promise.resolve({})
  const handleSubmit = jest.fn(() => promise)

  render(<LoginForm onSubmit={handleSubmit} />)

  const { email, password } = buildLoginForm({ overrides: { email: "doh!" } })

  userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole("button"))

  await screen.findByText(/invalid email address/i)

  expect(handleSubmit).not.toHaveBeenCalled()
})
