import userEvent from "@testing-library/user-event"

import * as faker from "faker"
import { ResetPasswordScreen } from "session/reset-password-screen"
import {
  createHistory,
  renderSession,
  screen,
  waitFor,
  waitForLoadingToFinish,
} from "test/test-utils"

test("successful reset request", async () => {
  const history = createHistory("/session/reset-password")

  renderSession(<ResetPasswordScreen />, { history })

  await waitForLoadingToFinish()

  const email = faker.internet.email()

  await userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  await userEvent.click(screen.getByRole("button"))

  waitFor(() => expect(history.location.pathname).toEqual("/session/reset-password/sent")).then(
    () => console.log("Happy, now?"),
  )
})
