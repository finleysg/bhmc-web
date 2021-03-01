import React from "react"

import { useRegistrationStatus } from "hooks/account-hooks"
import { useClubEvents } from "hooks/event-hooks"
import { Payment } from "models/payment"
import { Registration } from "models/registration"
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query"
import * as config from "utils/app-config"

import {
  useAuth,
  useClient,
} from "./auth-context"
import {
  EventRegistrationActions,
  eventRegistrationReducer,
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

  // TODO: generalize (some day)
  const isReturning = useRegistrationStatus(config.previousSeasonEventId)

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
      onError: (error) =>
        dispatch({ type: EventRegistrationActions.UpdateError, payload: error.message }),
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
      onError: (error) =>
        dispatch({ type: EventRegistrationActions.UpdateError, payload: error.message }),
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
        // Filling in required fees
        const placeholder = paymentPlaceholder()
        if (state.clubEvent.id === config.seasonEventId) {
          state.clubEvent.fees
            .filter((f) => f.isRequired)
            .filter((f) =>
              isReturning ? f.restriction === "Returning Members" : f.restriction === "New Members",
            )
            .forEach((fee) => {
              console.log(`adding required fee ${fee.name}`)
              placeholder.details.push({
                eventFeeId: fee.id,
                slotId: data.slots[0].id,
              })
            })
        } else {
          state.clubEvent.fees
            .filter((f) => f.isRequired)
            .forEach((fee) => {
              placeholder.details.push({
                eventFeeId: fee.id,
                slotId: data.slots[0].id,
              })
            })
        }

        dispatch({
          type: EventRegistrationActions.CreateRegistration,
          payload: {
            registration: new Registration(data),
            payment: placeholder,
          },
        })
        queryClient.setQueryData(["registration", variables.eventId], data)
      },
      onError: (error) =>
        dispatch({ type: EventRegistrationActions.UpdateError, payload: error.message }),
    },
  )

  const resetRegistration = React.useCallback(() => {
    dispatch({ type: EventRegistrationActions.UpdateError, payload: null })
    queryClient.invalidateQueries("registration")
    queryClient.invalidateQueries(["event-registrations", eventId])
    queryClient.invalidateQueries(["event-registration-slots", eventId])
    queryClient.invalidateQueries(["friends", eventId])
  }, [queryClient, eventId])

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
        dispatch({ type: EventRegistrationActions.UpdateError, payload: error.message })
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
        dispatch({ type: EventRegistrationActions.UpdateError, payload: error.message })
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
        dispatch({ type: EventRegistrationActions.CancelRegistration })
        queryClient.invalidateQueries("registration", { refetchActive: false })
        queryClient.invalidateQueries(["event-registrations", eventId])
        queryClient.invalidateQueries(["event-registration-slots", eventId])
        queryClient.invalidateQueries(["friends", eventId])
      },
      onError: (error) => {
        dispatch({ type: EventRegistrationActions.UpdateError, payload: error.message })
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
        dispatch({ type: EventRegistrationActions.UpdateError, payload: error.message })
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
        dispatch({ type: EventRegistrationActions.UpdateError, payload: error.message })
      },
    },
  )

  const savePayment = React.useCallback(
    (callback) => {
      if (state.payment?.id) {
        updatePayment(state.payment, {
          onSuccess: () => callback(),
        })
      } else {
        const payment = { ...state.payment }
        createPayment(payment, {
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

  const { mutate: adminPayment } = useMutation(
    (payment, player) => {
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
        dispatch({ type: EventRegistrationActions.UpdatePayment, payload: new Payment(data) })
      },
      onError: (error) => {
        dispatch({ type: EventRegistrationActions.UpdateError, payload: error.message })
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
            type: EventRegistrationActions.AddPlayer,
            payload: { slot, player },
          })
          queryClient.invalidateQueries(["friends", eventId])
        },
        onError: (error) => {
          dispatch({ type: EventRegistrationActions.UpdateError, payload: error.message })
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
            dispatch({ type: EventRegistrationActions.RemovePlayer, payload: slot.id })
          },
          onError: (error) => {
            dispatch({ type: EventRegistrationActions.UpdateError, payload: error.message })
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
    createRegistration,
    updateRegistration,
    cancelRegistration,
    completeRegistration,
    resetRegistration,
    savePayment,
    adminPayment,
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
