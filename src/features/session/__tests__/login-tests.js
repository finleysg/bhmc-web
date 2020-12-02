import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import React from "react"

import { LoginScreen } from "features/session/login-screen"
import { buildLoginForm } from "test/generate/auth"
import { rest, server } from "test/test-server"
import { AuthWrapper, deferred } from "test/test-utils"
import { apiUrl, authUrl } from "utils/client-utils"

const mockNav = jest.fn()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNav,
}))

afterEach(() => {
  // TODO: this is a useAuth implementation detail -- alternative?
  window.localStorage.removeItem("__bhmc_token__")
})

test("successful login", async () => {
  const { promise, resolve } = deferred()

  // post-login calls to bootstrap a user
  server.use(
    rest.get(apiUrl(`players`), async (req, res, ctx) => {
      return res(ctx.json([{}]))
    }),
    rest.get(apiUrl(`registration-slots`), async (req, res, ctx) => {
      return res(ctx.json([]))
    }),
  )

  render(
    <AuthWrapper>
      <LoginScreen />
    </AuthWrapper>,
  )

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(() => {
    resolve()
    return promise
  })

  const { email, password } = buildLoginForm()

  userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole("button"))

  await waitFor(() => expect(mockNav).toHaveBeenCalledWith("home"))
})

test("invalid credentials displays the error message", async () => {
  const testErrorMessage = ["Unable to log in with provided credentials."]
  const loginUrl = authUrl("token/login")
  server.use(
    rest.post(loginUrl, async (req, res, ctx) => {
      const err = ctx.json({ non_field_errors: testErrorMessage })
      return res(ctx.status(400), err)
    }),
  )

  const { promise, resolve } = deferred()

  render(
    <AuthWrapper>
      <LoginScreen />
    </AuthWrapper>,
  )

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(() => {
    resolve()
    return promise
  })

  const { email, password } = buildLoginForm()

  userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole("button"))

  const alert = await screen.findByRole("alert")

  expect(alert.textContent).toMatchSnapshot()
})
