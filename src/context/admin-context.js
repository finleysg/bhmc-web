import React from "react"

import { useClubEvents } from "hooks/event-hooks"
import { Payment } from "models/payment"
import { Registration } from "models/registration"
import {
  useMutation,
  useQueryClient,
} from "react-query"

import {
  EventAdminActions,
  eventAdminReducer,
} from "./admin-reducer"
import {
  useAuth,
  useClient,
} from "./auth-context"

const EventAdminContext = React.createContext()
EventAdminContext.displayName = "EventAdminContext"

function EventAdminProvider(props) {
  const [state, dispatch] = React.useReducer(eventAdminReducer)

  const eventId = state?.clubEvent?.id
  const { user } = useAuth()
  const events = useClubEvents()
  const client = useClient()
  const queryClient = useQueryClient()

  const paymentPlaceholder = () => {
    const placeholder = new Payment({
      id: 0,
      event: eventId,
      user: user.id,
    })
    return placeholder
  }

  const loadEvent = React.useCallback(
    (id) => {
      const event = events.find((evt) => evt.id === id)
      if (event) {
        dispatch({ type: EventAdminActions.LoadEvent, payload: event })
      }
    },
    [events],
  )

  const updateStep = React.useCallback((step) => {
    dispatch({ type: EventAdminActions.UpdateStep, payload: step })
  }, [])

  const { mutate: createRegistration } = useMutation(
    (registration) => {
      return client("registration", {
        data: {
          event: registration.eventId,
          course: registration.courseId,
          signed_up_by: "admin",
          slots: registration.slots.map((s) => s.obj),
        },
      })
    },
    {
      onSuccess: (data, variables) => {
        const placeholder = paymentPlaceholder()
        dispatch({
          type: EventAdminActions.CreateRegistration,
          payload: {
            registration: new Registration(data),
            payment: placeholder,
          },
        })
      },
      onError: (error) => dispatch({ type: EventAdminActions.UpdateError, payload: error.message }),
    },
  )

  const { mutate: updateRegistration } = useMutation(
    (registration) => {
      return client(`registration/${registration.id}`, {
        method: "PUT",
        data: {
          event: eventId,
          course: registration.courseId,
          notes: registration.notes,
          slots: registration.slots.map((s) => s.obj),
        },
      })
    },
    {
      onSuccess: (data, variables) => {
        dispatch({
          type: EventAdminActions.UpdateRegistration,
          payload: new Registration(data),
        })
      },
      onError: (error) => {
        dispatch({ type: EventAdminActions.UpdateError, payload: error.message })
      },
    },
  )

  const resetRegistration = React.useCallback(() => {
    dispatch({ type: EventAdminActions.ResetRegistration, payload: null })
  }, [])

  const { mutate: updateRegistrationSlotPlayer } = useMutation(
    ({ slotId, playerId }) => {
      return client(`registration-slots/${slotId}`, {
        method: "PATCH",
        data: {
          player: playerId,
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["event-registration-slots", eventId])
      },
      onError: (error) => {
        dispatch({ type: EventAdminActions.UpdateError, payload: error.message })
        return
      },
    },
  )

  const { mutate: cancelRegistration } = useMutation(
    (registrationId) => {
      return client(`registration/${registrationId}/cancel`, {
        method: "PUT",
      })
    },
    {
      onSettled: () => {
        if (state.payment?.id) {
          deletePayment(state.payment.id)
        }
        dispatch({ type: EventAdminActions.CancelRegistration })
        queryClient.invalidateQueries("admin-registration", { refetchActive: false })
        queryClient.invalidateQueries(["event-registrations", eventId])
        queryClient.invalidateQueries(["event-registration-slots", eventId])
      },
      onError: (error) => {
        dispatch({ type: EventAdminActions.UpdateError, payload: error.message })
      },
    },
  )

  const completeRegistration = React.useCallback(() => {
    dispatch({ type: EventAdminActions.LoadEvent, payload: null })
  }, [])

  const { mutate: createPayment } = useMutation(
    ({ payment, player }) => {
      return client(`payments/?player=${player.email}`, {
        data: {
          event: eventId,
          user: user.id,
          notification_type: "A",
          payment_code: payment.paymentCode,
          payment_amount: payment.paymentAmount,
          payment_details: payment.details.map((f) => {
            return {
              event_fee: f.eventFeeId,
              registration_slot: f.slotId,
            }
          }),
        },
      })
    },
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(["payment", variables.eventId], data)
        dispatch({ type: EventAdminActions.UpdatePayment, payload: new Payment(data) })
      },
      onError: (error) => {
        dispatch({ type: EventAdminActions.UpdateError, payload: error.message })
      },
    },
  )

  const { mutate: deletePayment } = useMutation(
    (paymentId) => {
      return client(`payments/${paymentId}`, {
        method: "DELETE",
      })
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("payment", { refetchActive: false })
        dispatch({ type: EventAdminActions.UpdatePayment, payload: null })
      },
      onError: (error) => {
        // Clear this error, otherwise we will be stuck in an unrecoverable state.
        // Most likely, we don't have a payment to delete.
        console.error(error)
        dispatch({ type: EventAdminActions.UpdateError, payload: null })
      },
    },
  )

  const addPlayer = (slot, player) => {
    // React.useCallback(
    updateRegistrationSlotPlayer(
      { slotId: slot.id, playerId: player.id },
      {
        onSuccess: () => {
          dispatch({
            type: EventAdminActions.AddPlayer,
            payload: { slot, player },
          })
        },
        onError: (error) => {
          dispatch({ type: EventAdminActions.UpdateError, payload: error.message })
          return
        },
      },
    )
  }
  //     [updateRegistrationSlotPlayer, queryClient, eventId, state.clubEvent.fees, state.payment],
  //   )

  const removePlayer = React.useCallback(
    (slot) => {
      updateRegistrationSlotPlayer(
        { slotId: slot.id, playerId: null },
        {
          onSuccess: () => {
            dispatch({ type: EventAdminActions.RemovePlayer, payload: slot.id })
          },
          onError: (error) => {
            dispatch({ type: EventAdminActions.UpdateError, payload: error.message })
          },
        },
      )
    },
    [updateRegistrationSlotPlayer],
  )

  const addFee = React.useCallback(({ eventFeeId, slotId }) => {
    dispatch({ type: EventAdminActions.AddFee, payload: { eventFeeId, slotId } })
  }, [])

  const removeFee = React.useCallback(({ eventFeeId, slotId }) => {
    dispatch({ type: EventAdminActions.RemoveFee, payload: { eventFeeId, slotId } })
  }, [])

  const value = {
    ...state,
    loadEvent,
    createRegistration,
    updateRegistration,
    cancelRegistration,
    completeRegistration,
    resetRegistration,
    createPayment,
    updateStep,
    addPlayer,
    removePlayer,
    addFee,
    removeFee,
  }

  return <EventAdminContext.Provider value={value} {...props} />
}

function useEventAdmin() {
  const context = React.useContext(EventAdminContext)
  if (context === undefined) {
    throw new Error(`useEventAdmin must be used within an EventAdminProvider`)
  }
  return context
}

export { EventAdminProvider, useEventAdmin }
