import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { RegisterForm } from "session/register-form"
import { buildRegisterForm } from "test/data/auth"
import { formSubmitSpy } from "test/test-utils"

test("submitting the register form calls onSubmit", async () => {
  const handleSubmit = formSubmitSpy()

  render(<RegisterForm onSubmit={handleSubmit} />)

  const { firstName, lastName, email, ghin, password, rePassword } = buildRegisterForm()

  await userEvent.type(screen.getByRole("textbox", { name: /first name/i }), firstName)
  await userEvent.type(screen.getByRole("textbox", { name: /last name/i }), lastName)
  await userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  await userEvent.type(screen.getByRole("textbox", { name: /ghin/i }), ghin)
  await userEvent.type(screen.getByLabelText("Password", { exact: true }), password)
  await userEvent.type(screen.getByLabelText(/confirm password/i), rePassword)
  await userEvent.click(screen.getByRole("button"))

  // await screen.findByTitle("loading")

  expect(handleSubmit).toHaveBeenCalledWith({
    first_name: firstName,
    last_name: lastName,
    email,
    ghin,
    password,
    re_password: rePassword,
  })
})

test("submitting the login form with mismatched passwords fails validation", async () => {
  const handleSubmit = formSubmitSpy()

  render(<RegisterForm onSubmit={handleSubmit} />)

  const { firstName, lastName, email, ghin, password } = buildRegisterForm()
  const rePassword = "bogus"

  await userEvent.type(screen.getByRole("textbox", { name: /first name/i }), firstName)
  await userEvent.type(screen.getByRole("textbox", { name: /last name/i }), lastName)
  await userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  await userEvent.type(screen.getByRole("textbox", { name: /ghin/i }), ghin)
  await userEvent.type(screen.getByLabelText("Password", { exact: true }), password)
  await userEvent.type(screen.getByLabelText(/confirm password/i), rePassword)
  await userEvent.click(screen.getByRole("button"))

  await screen.findByText(/passwords must match/i)

  expect(handleSubmit).not.toHaveBeenCalled()
})

test("all other fields are required on the register form", async () => {
  const handleSubmit = formSubmitSpy()

  render(<RegisterForm onSubmit={handleSubmit} />)

  await userEvent.click(screen.getByRole("button"))

  await screen.findByText(/first name is required/i)
  await screen.findByText(/last name is required/i)
  await screen.findByText(/a valid email is required/i)

  expect(handleSubmit).not.toHaveBeenCalled()
})
