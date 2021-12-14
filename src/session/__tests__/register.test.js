import userEvent from "@testing-library/user-event"

import React from "react"

import { RegisterScreen } from "session/register-screen"
import { buildRegisterForm } from "test/data/auth"
import { rest, server } from "test/test-server"
import { act, deferred, renderSession, screen, waitFor } from "test/test-utils"
import { authUrl } from "utils/client-utils"

const mockNav = jest.fn()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNav,
}))

test("successful registration", async () => {
  const { promise, resolve } = deferred()

  renderSession(<RegisterScreen />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(() => {
    resolve()
    return promise
  })

  const { firstName, lastName, email, ghin, password, rePassword } = buildRegisterForm()

  userEvent.type(screen.getByRole("textbox", { name: /first name/i }), firstName)
  userEvent.type(screen.getByRole("textbox", { name: /last name/i }), lastName)
  userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  userEvent.type(screen.getByRole("textbox", { name: /ghin/i }), ghin)
  userEvent.type(screen.getByLabelText("Password", { exact: true }), password)
  userEvent.type(screen.getByLabelText(/confirm password/i), rePassword)
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

  renderSession(<RegisterScreen />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(() => {
    resolve()
    return promise
  })

  const { firstName, lastName, email, password, rePassword } = buildRegisterForm()

  userEvent.type(screen.getByRole("textbox", { name: /first name/i }), firstName)
  userEvent.type(screen.getByRole("textbox", { name: /last name/i }), lastName)
  userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  userEvent.type(screen.getByLabelText("Password", { exact: true }), password)
  userEvent.type(screen.getByLabelText(/confirm password/i), rePassword)
  userEvent.click(screen.getByRole("button"))

  const alert = await screen.findByRole("alert")

  expect(alert.textContent).toMatchSnapshot()
  expect(screen.getByRole("link", { name: /reset your password/i })).toBeInTheDocument()
})
