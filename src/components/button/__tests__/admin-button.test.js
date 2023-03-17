import userEvent from "@testing-library/user-event"

import { buildAdminUser, buildUser } from "test/data/auth"
import { createHistory, render, screen, waitFor, waitForLoadingToFinish } from "test/test-utils"

import { AdminAction, AdminLink } from "../admin-buttons"

// const mockNav = jest.fn()
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => mockNav,
// }))

test("does not render an AdminLink for a non-admin user", async () => {
  const user = buildUser()

  render(<AdminLink to="nowhere" color="white" label="test" />, { user })

  await waitForLoadingToFinish()

  expect(screen.queryByRole("button")).not.toBeInTheDocument()
})

test("renders an AdminLink for an admin user", async () => {
  const user = buildAdminUser()

  render(<AdminLink to="nowhere" color="white" label="test" />, { user })

  await waitForLoadingToFinish()

  expect(screen.getByRole("button")).toBeInTheDocument()
})

test("navigates to the given admin destination", async () => {
  const history = createHistory()
  const user = buildAdminUser()

  render(<AdminLink to="/admin/event/123" color="white" label="test" />, { user, history })

  await waitForLoadingToFinish()

  const btn = await screen.findByRole("button")
  await userEvent.click(btn)

  waitFor(() => expect(history.location.pathname).toEqual("/admin/event/123")).then(() => {
    // navigation complete
  })
})

test("does not render an AdminAction for a non-admin user", async () => {
  const user = buildUser()

  render(<AdminAction onAction={jest.fn()} color="white" label="test" />, { user })

  await waitForLoadingToFinish()

  expect(screen.queryByRole("button")).not.toBeInTheDocument()
})

test("renders an AdminAction for an admin user", async () => {
  const user = buildAdminUser()

  render(<AdminAction onAction={jest.fn()} color="white" label="test" />, { user })

  await waitForLoadingToFinish()

  expect(screen.getByRole("button")).toBeInTheDocument()
})

test("raises action when AdminAction is clicked", async () => {
  const action = jest.fn()
  const user = buildAdminUser()

  render(<AdminAction onAction={action} color="white" label="test" />, { user })

  await waitForLoadingToFinish()

  const btn = await screen.findByRole("button")
  await userEvent.click(btn)

  expect(action).toHaveBeenCalledTimes(1)
})
