import userEvent from "@testing-library/user-event"

import { RegisterScreen } from "session/register-screen"
import { buildRegisterForm } from "test/data/auth"
import { rest, server } from "test/test-server"
import {
  createHistory,
  renderSession,
  screen,
  waitFor,
  waitForLoadingToFinish,
} from "test/test-utils"
import { authUrl } from "utils/client-utils"

const mockNav = jest.fn()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNav,
}))

test("successful registration", async () => {
  const history = createHistory("/session/account")
  renderSession(<RegisterScreen />, { history })

  await waitForLoadingToFinish()

  const { firstName, lastName, email, ghin, password, rePassword } = buildRegisterForm()

  await userEvent.type(screen.getByLabelText(/first name/i, { exact: true }), firstName)
  await userEvent.type(screen.getByLabelText(/last name/i), lastName)
  await userEvent.type(screen.getByLabelText(/email/i), email)
  await userEvent.type(screen.getByLabelText(/ghin/i), ghin)
  await userEvent.type(screen.getByLabelText("Password", { exact: true }), password)
  await userEvent.type(screen.getByLabelText(/confirm password/i), rePassword)

  await userEvent.click(screen.getByRole("button"))

  waitFor(() => expect(history.location.pathname).toEqual("/session/account/confirm")).then(() => {
    // navigation finished
  })
})

test("duplicate email displays custom message", async () => {
  const registerUrl = authUrl("users")
  server.use(
    rest.post(registerUrl, async (req, res, ctx) => {
      const err = ctx.json(["user already exists"])
      return res(ctx.status(400), err)
    }),
  )

  renderSession(<RegisterScreen />)

  await waitForLoadingToFinish()

  const { firstName, lastName, email, password, rePassword } = buildRegisterForm()

  await userEvent.type(screen.getByLabelText(/first name/i, { exact: true }), firstName)
  await userEvent.type(screen.getByLabelText(/last name/i), lastName)
  await userEvent.type(screen.getByLabelText(/email/i), email)
  await userEvent.type(screen.getByLabelText("Password", { exact: true }), password)
  await userEvent.type(screen.getByLabelText(/confirm password/i), rePassword)

  await userEvent.click(screen.getByRole("button"))

  const alert = await screen.findByRole("alert")

  expect(alert.textContent).toMatchInlineSnapshot(
    `"\\"We already have an account with that email. Do you need to reset your password?\\""`,
  )
  expect(screen.getByRole("link", { name: /reset your password/i })).toBeInTheDocument()
})
