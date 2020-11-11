import { act, render, screen, waitFor } from "@testing-library/react"

import React from "react"

import { rest } from "msw"
import { setupServer } from "msw/node"
import { handlers } from "test/auth-handlers"
import { AuthWrapper, deferred } from "test/test-utils"

import { AccountActivateScreen } from "../account-activate-screen"

const serverURL = process.env.REACT_APP_SERVER_URL
const server = setupServer(...handlers)

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ uid: "ABC", token: "123" }),
}))

beforeAll(() => {
  server.listen()
})
afterAll(() => server.close())
afterEach(() => {
  server.resetHandlers()
  jest.clearAllMocks()
})

test("successful activation", async () => {
  const { promise, resolve } = deferred()

  render(
    <AuthWrapper>
      <AccountActivateScreen />
    </AuthWrapper>,
  )

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(() => {
    resolve()
    return promise
  })

  await waitFor(() => expect(screen.queryByText(/your account is active/i)).toBeInTheDocument())
})

test("failed activation", async () => {
  const { promise, resolve } = deferred()
  server.use(
    rest.post(`${serverURL}/auth/users/activation/`, async (req, res, ctx) => {
      const err = ctx.json(["token expired"])
      return res(ctx.status(400), err)
    }),
  )

  render(
    <AuthWrapper>
      <AccountActivateScreen />
    </AuthWrapper>,
  )

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(() => {
    resolve()
    return promise
  })

  const alert = await screen.findByRole("alert")

  expect(alert.textContent).toMatchSnapshot()
  expect(screen.getByText(/activation failed/i)).toBeInTheDocument()
})
