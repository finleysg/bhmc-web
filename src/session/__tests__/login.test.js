import userEvent from "@testing-library/user-event"

import { LoginScreen } from "session/login-screen"
import { buildLoginForm } from "test/data/auth"
import { rest, server } from "test/test-server"
import {
  createHistory,
  renderSession,
  screen,
  waitFor,
  waitForLoadingToFinish,
} from "test/test-utils"
import { apiUrl, authUrl } from "utils/client-utils"

afterEach(() => {
  // TODO: this is a useAuth implementation detail -- alternative?
  window.localStorage.removeItem("__bhmc_token__")
})

test("successful login", async () => {
  const history = createHistory("/session/login")

  // post-login calls to bootstrap a user
  server.use(
    rest.get(apiUrl(`players`), async (_, response, context) => {
      return response(context.json([{}]))
    }),
    rest.get(apiUrl(`registration-slots`), async (_, response, context) => {
      return response(context.json([]))
    }),
  )

  renderSession(<LoginScreen />, { history })

  await waitForLoadingToFinish()

  const { email, password } = buildLoginForm()

  await userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole("button"))

  waitFor(() => expect(history.location.pathname).toEqual("/home")).then(() => {
    // navigation finished
  })
})

test("invalid credentials displays the error message", async () => {
  const testErrorMessage = ["Unable to log in with provided credentials."]
  const loginUrl = authUrl("token/login")

  server.use(
    rest.post(loginUrl, async (_, response, context) => {
      const err = context.json({ non_field_errors: testErrorMessage })
      return response(context.status(400), err)
    }),
  )

  renderSession(<LoginScreen />)

  await waitForLoadingToFinish()

  const { email, password } = buildLoginForm()

  await userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole("button"))

  const alert = await screen.findByRole("alert")

  expect(alert.textContent).toMatchInlineSnapshot(
    `"There was an error: Unable to log in with provided credentials."`,
  )
})
