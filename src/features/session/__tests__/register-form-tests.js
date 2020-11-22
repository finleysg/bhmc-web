import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import React from "react"

import { RegisterForm } from "features/session/register-form"
import { buildRegisterForm } from "test/generate/auth"

test("submitting the register form calls onSubmit", async () => {
  const promise = Promise.resolve({})
  const handleSubmit = jest.fn(() => promise)

  render(<RegisterForm onSubmit={handleSubmit} />)

  const { first_name, last_name, email, password, re_password } = buildRegisterForm()

  userEvent.type(screen.getByRole("textbox", { name: /first name/i }), first_name)
  userEvent.type(screen.getByRole("textbox", { name: /last name/i }), last_name)
  userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  userEvent.type(screen.getByLabelText("Password", { exact: true }), password)
  userEvent.type(screen.getByLabelText(/confirm password/i), re_password)
  userEvent.click(screen.getByRole("button"))

  await screen.findByTitle("loading")

  expect(handleSubmit).toHaveBeenCalledWith({ first_name, last_name, email, password, re_password })
})

test("submitting the login form with mismatched passwords fails validation", async () => {
  const promise = Promise.resolve({})
  const handleSubmit = jest.fn(() => promise)

  render(<RegisterForm onSubmit={handleSubmit} />)

  const { first_name, last_name, email, password } = buildRegisterForm()
  const re_password = "bogus"

  userEvent.type(screen.getByRole("textbox", { name: /first name/i }), first_name)
  userEvent.type(screen.getByRole("textbox", { name: /last name/i }), last_name)
  userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  userEvent.type(screen.getByLabelText("Password", { exact: true }), password)
  userEvent.type(screen.getByLabelText(/confirm password/i), re_password)
  userEvent.click(screen.getByRole("button"))

  await screen.findByText(/passwords must match/i)

  expect(handleSubmit).not.toHaveBeenCalled()
})

test("all other fields are required on the register form", async () => {
  const promise = Promise.resolve({})
  const handleSubmit = jest.fn(() => promise)

  render(<RegisterForm onSubmit={handleSubmit} />)

  userEvent.click(screen.getByRole("button"))

  await screen.findByText(/first name is required/i)
  await screen.findByText(/last name is required/i)
  await screen.findByText(/a valid email is required/i)

  expect(handleSubmit).not.toHaveBeenCalled()
})
