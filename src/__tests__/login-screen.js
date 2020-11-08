import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import React from "react"

import { AuthProvider } from "context/auth-context"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { MemoryRouter as Router } from "react-router-dom"
import { LoginScreen } from "screens/login"
import { handlers } from "test/auth-handlers"
import { buildLoginForm } from "test/generate/auth"
import { deferred } from "test/test-utils"

const Wrapper = ({ children }) => (
  <Router>
    <AuthProvider>{children}</AuthProvider>
  </Router>
)
const serverURL = process.env.REACT_APP_SERVER_URL
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
})

test("successful login", async () => {
  const { promise, resolve } = deferred()

  render(
    <Wrapper>
      <LoginScreen />
    </Wrapper>,
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

  // await waitFor(expect(mockNav).toHaveBeenCalledWith("home"))
})

test("invalid credentials displays the error message", async () => {
  const testErrorMessage = ["Unable to log in with provided credentials."]
  const loginUrl = `${serverURL}/auth/token/login`
  server.use(
    rest.post(loginUrl, async (req, res, ctx) => {
      const err = ctx.json({ non_field_errors: testErrorMessage })
      return res(ctx.status(400), err)
    }),
  )

  const { promise, resolve } = deferred()

  render(
    <Wrapper>
      <LoginScreen />
    </Wrapper>,
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
