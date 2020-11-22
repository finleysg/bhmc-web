import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import React from "react"

import { LoginScreen } from "features/session/login-screen"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { handlers } from "test/auth-handlers"
import { buildLoginForm } from "test/generate/auth"
import { AuthWrapper, deferred } from "test/test-utils"
import { authUrl } from "utils/client-utils"

const server = setupServer(...handlers)

const mockNav = jest.fn()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNav,
}))

beforeAll(() => {
  server.listen()
})
afterAll(() => server.close())
afterEach(() => {
  server.resetHandlers()
  jest.clearAllMocks()
  // TODO: this is a useAuth implementation detail -- alternative?
  window.localStorage.removeItem("__bhmc_token__")
})

test("successful login", async () => {
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
