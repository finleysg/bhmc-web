import { rest, server } from "test/test-server"
import { renderSession, screen, waitForLoadingToFinish } from "test/test-utils"
import { authUrl } from "utils/client-utils"

import { AccountActivateScreen } from "../account-activate-screen"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ uid: "ABC", token: "123" }),
}))

test("successful activation", async () => {
  renderSession(<AccountActivateScreen />)

  await waitForLoadingToFinish()

  await screen.findByText(/your account is active/i)
})

test("failed activation", async () => {
  server.use(
    rest.post(authUrl("users/activation/"), async (req, res, ctx) => {
      const err = ctx.json(["token expired"])
      return res(ctx.status(400), err)
    }),
  )

  renderSession(<AccountActivateScreen />)

  await waitForLoadingToFinish()

  const alert = await screen.findByRole("alert")

  expect(alert.textContent).toMatchInlineSnapshot(`"There was an error: [\\"token expired\\"]"`)
  expect(screen.getByText(/activation failed/i)).toBeInTheDocument()
})
