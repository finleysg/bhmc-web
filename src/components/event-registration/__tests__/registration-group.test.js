import userEvent from "@testing-library/user-event"

import { buildUser } from "test/data/auth"
import {
  cartFee,
  createEmptyPayment,
  createRegistration,
  eventFee,
  skinFee,
} from "test/data/registration"

import { render, screen, waitForLoadingToFinish, within } from "../../../test/test-utils"
import RegistrationGroup from "../registration-group"

test("renders registration group", async () => {
  const fees = [eventFee(), skinFee(), cartFee()]
  const registration = createRegistration()
  const payment = createEmptyPayment()
  const user = buildUser()

  const addFeeSpy = jest.fn()
  const removeFeeSpy = jest.fn()
  const removePlayerSpy = jest.fn()

  render(
    <div>
      <RegistrationGroup
        addFee={addFeeSpy}
        removeFee={removeFeeSpy}
        removePlayer={removePlayerSpy}
        eventFees={fees}
        registration={registration}
        payment={payment}
        layout="horizontal"
        teamSize={1}
        skinsType="Individual"
      />
    </div>,
    { user },
  )

  await waitForLoadingToFinish()

  // Fee headers
  const feeHeaders = screen.getByTestId("event-fee-header")
  expect(within(feeHeaders).getByText(/event fee/i)).toBeInTheDocument()
  expect(within(feeHeaders).getByText(/skins fee/i)).toBeInTheDocument()
  expect(within(feeHeaders).getByText(/cart fee/i)).toBeInTheDocument()

  // Slots
  const slots = screen.getAllByTestId("registration-slot")
  expect(slots).toHaveLength(4)

  // Add and remove fees bubbles up to here
  const checkboxes = screen.getAllByRole("checkbox", {
    title: /add to registration/i,
    checked: false,
  })

  await userEvent.click(checkboxes[0])
  expect(addFeeSpy).toHaveBeenCalledTimes(1)

  // await userEvent.click(checkboxes[0])
  // expect(removeFeeSpy).toHaveBeenCalledTimes(1)
})
