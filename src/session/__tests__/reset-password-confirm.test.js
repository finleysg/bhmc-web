import userEvent from "@testing-library/user-event"

import * as faker from "faker"
import { ResetPasswordConfirmScreen } from "session/index"
import {
  createHistory,
  renderSession,
  screen,
  waitFor,
  waitForLoadingToFinish,
} from "test/test-utils"

test("successful password reset", async () => {
  const history = createHistory("/session/reset-password")

  renderSession(<ResetPasswordConfirmScreen />, { history })

  await waitForLoadingToFinish()

  const newPassword = faker.internet.password()
  const reNewPassword = newPassword

  await userEvent.type(screen.getByLabelText("Password", { exact: true }), newPassword)
  await userEvent.type(screen.getByLabelText(/confirm password/i), reNewPassword)
  await userEvent.click(screen.getByRole("button"))

  waitFor(() => expect(history.location.pathname).toEqual("/session/reset-password/complete")).then(
    () => {
      // navigation finished
    },
  )
})
