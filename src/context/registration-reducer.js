import produce from "immer"

const EventRegistrationSteps = {
  Pending: {
    name: "pending",
  },
  Reserve: {
    name: "reserve",
    title: "Reserve Tee Time or Starting Hole",
  },
  Register: {
    name: "register",
    title: "Online Registration",
  },
  Review: {
    name: "review",
    title: "Confirm Registration Details",
  },
  Payment: {
    name: "payment",
    title: "Submit Payment",
  },
  Complete: {
    name: "complete",
    title: "Registration Complete",
  },
}

const EventRegistrationActions = {
  LoadEvent: "load-event",
  CreateRegistration: "create-registration",
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

const initialEventRegistrationState = {
  clubEvent: null,
  registration: null,
  payment: null,
  selectedFees: [],
  error: null,
  currentStep: EventRegistrationSteps.Pending,
}

const eventRegistrationReducer = produce((draft, action) => {
  const { type, payload } = action
  switch (type) {
    case EventRegistrationActions.LoadEvent: {
      draft.clubEvent = payload
      draft.registration = null
      draft.payment = null
      draft.selectedFees = []
      draft.error = null
      draft.currentStep = EventRegistrationSteps.Pending
      return
    }
    case EventRegistrationActions.UpdateStep: {
      draft.currentStep = payload
      return
    }
    case EventRegistrationActions.CreateRegistration: {
      draft.registration = payload.registration
      draft.payment = payload.payment
      draft.currentStep = EventRegistrationSteps.Register
      return
    }
    case EventRegistrationActions.UpdateRegistration: {
      draft.registration = payload
      draft.error = null
      return
    }
    case EventRegistrationActions.CancelRegistration: {
      draft.registration = null
      draft.payment = null
      draft.selectedFees = []
      draft.error = null
      draft.currentStep = EventRegistrationSteps.Pending
      return
    }
    case EventRegistrationActions.UpdatePayment: {
      draft.payment = payload
      draft.error = null
      return
    }
    case EventRegistrationActions.AddPlayer: {
      const { slot, player } = payload
      const slotToUpdate = draft.registration.slots.find((s) => s.id === slot.id)
      slotToUpdate.playerId = player.id
      slotToUpdate.playerName = player.name
      draft.clubEvent.fees
        .filter((f) => f.isRequired)
        .forEach((fee) => {
          draft.payment.details.push({
            eventFeeId: fee.id,
            slotId: slot.id,
          })
        })
      return
    }
    case EventRegistrationActions.RemovePlayer: {
      const slot = draft.registration.slots.find((slot) => slot.id === payload)
      slot.playerId = 0
      slot.playerName = undefined
      // remove fees for slot
      draft.payment.details = draft.payment.details.filter((d) => d.slotId !== slot.id)
      return
    }
    case EventRegistrationActions.AddFee: {
      draft.payment.details.push({
        eventFeeId: payload.eventFeeId,
        slotId: payload.slotId,
      })
      return
    }
    case EventRegistrationActions.RemoveFee: {
      const index = draft.payment.details.findIndex(
        (p) => p.eventFeeId === payload.eventFeeId && p.slotId === payload.slotId,
      )
      if (index >= 0) {
        draft.payment.details.splice(index, 1)
      }
      return
    }
    case EventRegistrationActions.UpdateError: {
      draft.error = payload
      return
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}, initialEventRegistrationState)

export { EventRegistrationActions, eventRegistrationReducer, EventRegistrationSteps }
