import { act, render, screen, waitFor } from "@testing-library/react"

import React from "react"

import { rest, server } from "test/test-server"
import { AuthWrapper, deferred } from "test/test-utils"
import { authUrl } from "utils/client-utils"

import { AccountActivateScreen } from "../account-activate-screen"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ uid: "ABC", token: "123" }),
}))

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
    rest.post(authUrl("users/activation/"), async (req, res, ctx) => {
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
