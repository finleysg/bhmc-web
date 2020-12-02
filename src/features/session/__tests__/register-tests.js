import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import React from "react"

import { buildRegisterForm } from "test/generate/auth"
import { rest, server } from "test/test-server"
import { AuthWrapper, deferred } from "test/test-utils"
import { authUrl } from "utils/client-utils"

import { RegisterScreen } from "../register-screen"

const mockNav = jest.fn()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNav,
}))

test("successful registration", async () => {
  const { promise, resolve } = deferred()

  render(
    <AuthWrapper>
      <RegisterScreen />
    </AuthWrapper>,
  )

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(() => {
    resolve()
    return promise
  })

  const { first_name, last_name, email, password, re_password } = buildRegisterForm()

  userEvent.type(screen.getByRole("textbox", { name: /first name/i }), first_name)
  userEvent.type(screen.getByRole("textbox", { name: /last name/i }), last_name)
  userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  userEvent.type(screen.getByLabelText("Password", { exact: true }), password)
  userEvent.type(screen.getByLabelText(/confirm password/i), re_password)
  userEvent.click(screen.getByRole("button"))

  await waitFor(() => expect(mockNav).toHaveBeenCalledWith("session/account/confirm"))
})

test("duplicate email displays custom message", async () => {
  const registerUrl = authUrl("users")
  server.use(
    rest.post(registerUrl, async (req, res, ctx) => {
      const err = ctx.json(["user already exists"])
      return res(ctx.status(400), err)
    }),
  )

  const { promise, resolve } = deferred()

  render(
    <AuthWrapper>
      <RegisterScreen />
    </AuthWrapper>,
  )

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(() => {
    resolve()
    return promise
  })

  const { first_name, last_name, email, password, re_password } = buildRegisterForm()

  userEvent.type(screen.getByRole("textbox", { name: /first name/i }), first_name)
  userEvent.type(screen.getByRole("textbox", { name: /last name/i }), last_name)
  userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  userEvent.type(screen.getByLabelText("Password", { exact: true }), password)
  userEvent.type(screen.getByLabelText(/confirm password/i), re_password)
  userEvent.click(screen.getByRole("button"))

  const alert = await screen.findByRole("alert")

  expect(alert.textContent).toMatchSnapshot()
  expect(screen.getByRole("link", { name: /reset your password/i })).toBeInTheDocument()
})
