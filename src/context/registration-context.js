import React from "react"

import { useClubEvents } from "hooks/event-hooks"
import { Payment, paymentPlaceholder } from "models/payment"
import { Registration } from "models/registration"
import { useMutation, useQuery, useQueryClient } from "react-query"

import { useAuth, useClient } from "./auth-context"
import {
  EventRegistrationActions,
  eventRegistrationReducer,
  EventRegistrationSteps,
} from "./registration-reducer"

const RegistrationSteps = {
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

const EventRegistrationContext = React.createContext()
EventRegistrationContext.displayName = "EventRegistrationContext"

function EventRegistrationProvider(props) {
  const [state, dispatch] = React.useReducer(eventRegistrationReducer)

  const eventId = state?.clubEvent?.id
  const { user } = useAuth()
  const events = useClubEvents()
  const client = useClient()
  const queryClient = useQueryClient()

  const loadEvent = React.useCallback(
    (id) => {
      const event = events.find((evt) => evt.id === id)
      if (event) {
        dispatch({ type: EventRegistrationActions.LoadEvent, payload: event })
      }
    },
    [events],
  )

  const updateStep = React.useCallback((step) => {
    dispatch({ type: EventRegistrationActions.UpdateStep, payload: step })
  }, [])

  useQuery(
    ["registration", eventId],
    () => {
      if (user && user.is_authenticated && eventId) {
        return client(`registration/?event_id=${eventId}&player=me`).then((data) => data[0])
      }
    },
    {
      initialData: () => {
        const queryData = queryClient.getQueryData("registration")
        if (queryData !== undefined) {
          if (Array.isArray(queryData)) {
            return queryData.find((r) => r.event === eventId)
          }
          return queryData
        }
      },
      staleTime: 1000 * 60 * 15,
      cacheTime: 1000 * 60 * 15,
      onSuccess: (data) => {
        if (data) {
          dispatch({
            type: EventRegistrationActions.UpdateRegistration,
            payload: new Registration(data),
          })
        }
      },
      onError: (error) => dispatch({ type: EventRegistrationActions.UpdateError, payload: error }),
    },
  )

  useQuery(
    ["payment", eventId],
    () => {
      if (user && user.is_authenticated && eventId) {
        return client(`payments/?event=${eventId}&player=me`).then((data) => data[0])
      }
    },
    {
      initialData: () => {
        const queryData = queryClient.getQueryData("payment")
        if (queryData !== undefined) {
          if (Array.isArray(queryData)) {
            return queryData.find((r) => r.event === eventId)
          }
          return queryData
        }
      },
      staleTime: 1000 * 60 * 15,
      cacheTime: 1000 * 60 * 15,
      onSuccess: (data) => {
        if (data) {
          dispatch({ type: EventRegistrationActions.UpdatePayment, payload: new Payment(data) })
        } else {
          dispatch({ type: EventRegistrationActions.UpdatePayment, payload: null })
        }
      },
      onError: (error) => dispatch({ type: EventRegistrationActions.UpdateError, payload: error }),
    },
  )

  const { mutate: createRegistration } = useMutation(
    (registration) => {
      return client("registration", {
        data: {
          event: eventId,
          course: registration.courseId,
          slots: registration.slots.map((s) => s.obj),
        },
      })
    },
    {
      onSuccess: (data, variables) => {
        dispatch({
          type: EventRegistrationActions.CreateRegistration,
          payload: {
            registration: new Registration(data),
            payment: paymentPlaceholder(eventId, user.id),
          },
        })
        queryClient.setQueryData(["registration", variables.eventId], data)
      },
      onError: (error) => dispatch({ type: EventRegistrationActions.UpdateError, payload: error }),
    },
  )

  const startRegistration = React.useCallback(
    (registration) => {
      if (state.registration?.id) {
        dispatch({
          type: EventRegistrationActions.UpdateStep,
          payload: EventRegistrationSteps.Register,
        })
      } else {
        createRegistration(registration)
      }
    },
    [state, createRegistration],
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
          type: EventRegistrationActions.UpdateRegistration,
          payload: new Registration(data),
        })
        queryClient.setQueryData(["registration", variables.eventId], data)
      },
      onError: (error) => {
        dispatch({ type: EventRegistrationActions.UpdateError, payload: error })
      },
    },
  )

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
        dispatch({ type: EventRegistrationActions.UpdateError, payload: error })
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
        queryClient.invalidateQueries("registration", { refetchActive: false })
        if (state.payment?.id) {
          deletePayment(state.payment.id)
        }
        dispatch({ type: EventRegistrationActions.CancelRegistration })
      },
    },
  )

  const completeRegistration = React.useCallback(() => {
    queryClient.invalidateQueries("my-events", { refetchInactive: true })
    dispatch({ type: EventRegistrationActions.LoadEvent, payload: null })
  }, [queryClient])

  const { mutate: createPayment } = useMutation(
    (payment) => {
      return client("payments", {
        data: {
          event: eventId,
          user: user.id,
          notification_type: payment.notificationType,
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
        dispatch({ type: EventRegistrationActions.UpdatePayment, payload: new Payment(data) })
      },
      onError: (error) => {
        dispatch({ type: EventRegistrationActions.UpdateError, payload: error })
      },
    },
  )

  const { mutate: updatePayment } = useMutation(
    (payment) => {
      return client(`payments/${payment.id}`, {
        method: "PUT",
        data: {
          event: eventId,
          user: user.id,
          notification_type: payment.notificationType,
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
        dispatch({ type: EventRegistrationActions.UpdatePayment, payload: new Payment(data) })
      },
      onError: (error) => {
        dispatch({ type: EventRegistrationActions.UpdateError, payload: error })
      },
    },
  )

  const savePayment = React.useCallback(
    (notificationType, callback) => {
      if (state.payment?.id) {
        updatePayment(state.payment, {
          onSuccess: () => callback(),
        })
      } else {
        state.payment.notificationType = notificationType
        createPayment(state.payment, {
          onSuccess: () => callback(),
        })
      }
    },
    [state?.payment, createPayment, updatePayment],
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
        dispatch({ type: EventRegistrationActions.UpdatePayment, payload: null })
      },
      onError: (error) => {
        // Clear this error, otherwise we will be stuck in an unrecoverable state.
        // Most likely, we don't have a payment to delete.
        console.error(error)
        dispatch({ type: EventRegistrationActions.UpdateError, payload: null })
      },
    },
  )

  const addPlayer = React.useCallback(
    (slot, player) => {
      updateRegistrationSlotPlayer(
        { slotId: slot.id, playerId: player.id },
        {
          onSettled: () => {
            dispatch({ type: EventRegistrationActions.AddPlayer, payload: { slot, player } })
          },
        },
      )
    },
    [updateRegistrationSlotPlayer],
  )

  const removePlayer = React.useCallback(
    (slot) => {
      updateRegistrationSlotPlayer(
        { slotId: slot.id, playerId: null },
        {
          onSettled: () => {
            dispatch({ type: EventRegistrationActions.RemovePlayer, payload: slot.id })
          },
        },
      )
    },
    [updateRegistrationSlotPlayer],
  )

  const addFee = React.useCallback(({ eventFeeId, slotId }) => {
    dispatch({ type: EventRegistrationActions.AddFee, payload: { eventFeeId, slotId } })
  }, [])

  const removeFee = React.useCallback(({ eventFeeId, slotId }) => {
    dispatch({ type: EventRegistrationActions.RemoveFee, payload: { eventFeeId, slotId } })
  }, [])

  const value = {
    ...state,
    loadEvent,
    startRegistration,
    updateRegistration,
    cancelRegistration,
    completeRegistration,
    savePayment,
    updateStep,
    addPlayer,
    removePlayer,
    addFee,
    removeFee,
  }

  return <EventRegistrationContext.Provider value={value} {...props} />
}

function useEventRegistration() {
  const context = React.useContext(EventRegistrationContext)
  if (context === undefined) {
    throw new Error(`useRegistration must be used within a RegistrationProvider`)
  }
  return context
}

export { EventRegistrationProvider, RegistrationSteps, useEventRegistration }
