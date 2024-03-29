import userEvent from "@testing-library/user-event"

import React from "react"

import { buildAdminUser, buildUser } from "test/data/auth"
import { render, screen, waitFor, waitForLoadingToFinish } from "test/test-utils"

import { AdminAction, AdminLink } from "../admin-buttons"

const mockNav = jest.fn()
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNav,
}))

test("does not render an AdminLink for a non-admin user", async () => {
  const user = buildUser()

  render(<AdminLink to="nowhere" color="white" label="test" />, { user })

  await waitForLoadingToFinish()
  await waitFor(() => expect(screen.queryByRole("button")).not.toBeInTheDocument())
})

test("renders an AdminLink for an admin user", async () => {
  const user = buildAdminUser()

  render(<AdminLink to="nowhere" color="white" label="test" />, { user })

  await waitForLoadingToFinish()
  await waitFor(() => expect(screen.queryByRole("button")).toBeInTheDocument())
})

test("navigates to the given admin destination", async () => {
  const user = buildAdminUser()

  render(<AdminLink to="some/destination" color="white" label="test" />, { user })

  await waitForLoadingToFinish()

  const btn = await screen.findByRole("button")
  userEvent.click(btn)

  await waitFor(() => expect(mockNav).toHaveBeenCalledWith("some/destination"))
})

test("does not render an AdminAction for a non-admin user", async () => {
  const user = buildUser()

  render(<AdminAction onAction={jest.fn()} color="white" label="test" />, { user })

  await waitForLoadingToFinish()
  await waitFor(() => expect(screen.queryByRole("button")).not.toBeInTheDocument())
})

test("renders an AdminAction for an admin user", async () => {
  const user = buildAdminUser()

  render(<AdminAction onAction={jest.fn()} color="white" label="test" />, { user })

  await waitForLoadingToFinish()
  await waitFor(() => expect(screen.queryByRole("button")).toBeInTheDocument())
})

test("raises action when AdminAction is clicked", async () => {
  const action = jest.fn()
  const user = buildAdminUser()

  render(<AdminAction onAction={action} color="white" label="test" />, { user })

  await waitForLoadingToFinish()

  const btn = await screen.findByRole("button")
  userEvent.click(btn)

  expect(action).toHaveBeenCalledTimes(1)
})
