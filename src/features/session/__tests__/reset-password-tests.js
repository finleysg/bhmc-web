import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import React from "react"

import * as faker from "faker"
import { ResetPasswordScreen } from "features/session/reset-password-screen"
import { setupServer } from "msw/node"
import { handlers } from "test/auth-handlers"
import { AuthWrapper, deferred } from "test/test-utils"

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

test("successful reset request", async () => {
  const { promise, resolve } = deferred()

  render(
    <AuthWrapper>
      <ResetPasswordScreen />
    </AuthWrapper>,
  )

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(() => {
    resolve()
    return promise
  })

  const email = faker.internet.email()

  userEvent.type(screen.getByRole("textbox", { name: /email/i }), email)
  userEvent.click(screen.getByRole("button"))

  await waitFor(() => expect(mockNav).toHaveBeenCalledWith("/session/reset-password/sent"))
})