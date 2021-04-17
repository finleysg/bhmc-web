import produce from "immer"
import * as config from "utils/app-config"

const EventAdminSteps = {
  Pending: {
    name: "pending",
  },
  Reserve: {
    name: "reserve",
    title: "Select Tee Time or Starting Hole",
  },
  Register: {
    name: "register",
    title: "Admin Registration",
  },
  Review: {
    name: "review",
    title: "Confirm Registration Details",
  },
  Payment: {
    name: "payment",
    title: "Payment Details",
  },
  Complete: {
    name: "complete",
    title: "Registration Complete",
  },
}

const EventAdminActions = {
  LoadEvent: "load-event",
  CreateRegistration: "create-registration",
  LoadRegistration: "load-registration",
  UpdateRegistration: "update-registration",
  CancelRegistration: "cancel-registration",
  ResetRegistration: "reset-registration",
  UpdatePayment: "update-payment",
  UpdateError: "update-error",
  UpdateStep: "update-step",
  AddPlayer: "add-player",
  RemovePlayer: "remove-player",
  AddFee: "add-fee",
  RemoveFee: "remove-fee",
}

const initialEventAdminState = {
  clubEvent: null,
  registration: null,
  payment: null,
  selectedFees: [],
  error: null,
  currentStep: EventAdminSteps.Pending,
}

const eventAdminReducer = produce((draft, action) => {
  const { type, payload } = action
  switch (type) {
    case EventAdminActions.LoadEvent: {
      draft.clubEvent = payload
      draft.registration = null
      draft.payment = null
      draft.selectedFees = []
      draft.error = null
      draft.currentStep = EventAdminSteps.Pending
      return
    }
    case EventAdminActions.UpdateStep: {
      draft.currentStep = payload
      return
    }
    case EventAdminActions.CreateRegistration: {
      draft.registration = payload.registration
      draft.payment = payload.payment
      draft.currentStep = EventAdminSteps.Register
      return
    }
    case EventAdminActions.LoadRegistration: {
      draft.registration = payload.registration
      draft.registration.slots.forEach((slot) => {
        // The event_fee_ids already paid
        payload.existingFees
          .filter((f) => f.registration_slot === slot.id)
          .forEach((f) => slot.paidFeeIds.push(f.event_fee))
      })
      draft.payment = payload.payment
      return
    }
    case EventAdminActions.UpdateRegistration: {
      draft.registration = payload
      draft.error = null
      return
    }
    case EventAdminActions.CancelRegistration:
    case EventAdminActions.ResetRegistration: {
      draft.registration = null
      draft.payment = null
      draft.selectedFees = []
      draft.error = null
      draft.currentStep = EventAdminSteps.Pending
      return
    }
    case EventAdminActions.UpdatePayment: {
      draft.payment = payload
      draft.error = null
      return
    }
    case EventAdminActions.AddPlayer: {
      const { slot, player } = payload
      const slotToUpdate = draft.registration.slots.find((s) => s.id === slot.id)
      slotToUpdate.playerId = player.id
      slotToUpdate.playerName = player.name
      if (draft.clubEvent.id === config.seasonEventId) {
        draft.clubEvent.fees
          .filter((f) => f.isRequired)
          .filter((f) =>
            player.isReturningMember
              ? f.restriction === "Returning Members"
              : f.restriction === "New Members",
          )
          .forEach((fee) => {
            draft.payment.details.push({
              eventFeeId: fee.id,
              slotId: slot.id,
            })
          })
      } else {
        draft.clubEvent.fees
          .filter((f) => f.isRequired)
          .forEach((fee) => {
            draft.payment.details.push({
              eventFeeId: fee.id,
              slotId: slot.id,
            })
          })
      }
      return
    }
    case EventAdminActions.RemovePlayer: {
      const slot = draft.registration.slots.find((slot) => slot.id === payload)
      slot.playerId = 0
      slot.playerName = undefined
      // remove fees for slot
      draft.payment.details = draft.payment.details.filter((d) => d.slotId !== slot.id)
      return
    }
    case EventAdminActions.AddFee: {
      draft.payment.details.push({
        eventFeeId: payload.eventFeeId,
        slotId: payload.slotId,
      })
      return
    }
    case EventAdminActions.RemoveFee: {
      const index = draft.payment.details.findIndex(
        (p) => p.eventFeeId === payload.eventFeeId && p.slotId === payload.slotId,
      )
      if (index >= 0) {
        draft.payment.details.splice(index, 1)
      }
      return
    }
    case EventAdminActions.UpdateError: {
      draft.error = payload
      return
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}, initialEventAdminState)

export { EventAdminActions, eventAdminReducer, EventAdminSteps }
