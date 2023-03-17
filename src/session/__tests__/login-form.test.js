import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { LoginForm } from "session/login-form"
import { buildLoginForm } from "test/data/auth"
import { formSubmitSpy } from "test/test-utils"

test("submitting the login form calls onSubmit with email and password", async () => {
  const handleSubmit = formSubmitSpy()

  render(<LoginForm onSubmit={handleSubmit} />)

  const { email, password } = buildLoginForm()

  await userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole("button"))

  expect(handleSubmit).toHaveBeenCalledWith({
    email,
    password,
  })
})

test("submitting the login form without a password fails validation", async () => {
  const handleSubmit = formSubmitSpy()

  render(<LoginForm onSubmit={handleSubmit} />)

  const { email } = buildLoginForm()

  await userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  await userEvent.click(screen.getByRole("button"))

  await screen.findByText(/password is required/i)

  expect(handleSubmit).not.toHaveBeenCalled()
})

test("submitting the login form without an email fails validation", async () => {
  const handleSubmit = formSubmitSpy()

  render(<LoginForm onSubmit={handleSubmit} />)

  const { password } = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole("button"))

  await screen.findByText(/a valid email is required/i)

  expect(handleSubmit).not.toHaveBeenCalled()
})

test("submitting the login form with an invalid email fails validation", async () => {
  const handleSubmit = formSubmitSpy()

  render(<LoginForm onSubmit={handleSubmit} />)

  const { email, password } = buildLoginForm({ overrides: { email: "doh!" } })

  await userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole("button"))

  await screen.findByText(/invalid email address/i)

  expect(handleSubmit).not.toHaveBeenCalled()
})
