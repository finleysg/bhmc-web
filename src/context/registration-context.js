import React from "react"

import { useRegistrationStatus } from "hooks/account-hooks"
import { useClubEvents } from "hooks/event-hooks"
import { useSettings } from "hooks/use-settings"
import { Payment } from "models/payment"
import { Registration } from "models/registration"
import { useMutation, useQueryClient } from "react-query"
import { toast } from "react-toastify"

import { useAuth, useClient } from "./auth-context"
import { EventRegistrationActions, eventRegistrationReducer } from "./registration-reducer"

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
  const { seasonEventId, previousSeasonEventId } = useSettings()
  const [state, dispatch] = React.useReducer(eventRegistrationReducer)

  const eventId = state?.clubEvent?.id
  const { user } = useAuth()
  const events = useClubEvents()
  const client = useClient()
  const queryClient = useQueryClient()

  const isReturning = useRegistrationStatus(previousSeasonEventId)

  /**
   * Creates an empty payment object, used to collect payment details.
   */
  const paymentPlaceholder = React.useCallback(() => {
    const placeholder = new Payment({
      id: 0,
      event: eventId,
      user: user.id,
    })
    return placeholder
  }, [eventId, user])

  /**
   * Loads the given event into state and resets all other state.
   * @param {number} id - The event id to load.
   */
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

  const loadRegistration = React.useCallback(
    (playerId) => {
      return client(`registration/?event_id=${eventId}&player_id=${playerId}`).then((data) => {
        const registration = new Registration(data[0])
        return client(`registration-fees/?registration_id=${registration.id}&confirmed=true`).then(
          (fees) => {
            dispatch({
              type: EventRegistrationActions.LoadRegistration,
              payload: {
                registration: registration,
                payment: paymentPlaceholder(),
                existingFees: fees,
              },
            })
            queryClient.setQueryData(["registration", eventId], data[0])
          },
        )
      })
    },
    [client, eventId, queryClient, paymentPlaceholder],
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
        if (state.clubEvent.id === seasonEventId) {
          state.clubEvent.fees
            .filter((f) => f.isRequired)
            .filter((f) =>
              isReturning ? f.restriction === "Returning Members" : f.restriction === "New Members",
            )
            .forEach((fee) => {
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
      onError: (error) => {
        if (error.message === "Database conflict") {
          handleRegistrationConflict()
        } else {
          dispatch({ type: EventRegistrationActions.UpdateError, payload: error.message })
        }
      },
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
      },
    },
  )

  const { mutate: cancelRegistration } = useMutation(
    ({ registrationId, paymentId }) => {
      return client(`registration/${registrationId}/cancel/?payment_id=${paymentId ?? 0}`, {
        method: "PUT",
      })
    },
    {
      onSettled: () => {
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

  const handleRegistrationConflict = () => {
    Promise.all([
      client(`registration/?event_id=${eventId}&player=me`),
      client(`payments/?event=${eventId}&player=me`),
    ]).then((results) => {
      const reg = results[0]
      const pmt = results[1]

      const paymentId = pmt && pmt.length > 0 ? pmt[0].id : undefined
      const registrationId = reg && reg.length > 0 ? reg[0].id : undefined

      if (registrationId === undefined) {
        toast.warning("It looks like someone else has is signing you up right now.")
      } else {
        cancelRegistration(
          { registrationId, paymentId },
          {
            onSuccess: () => {
              const message =
                "We had to clean up a previous incomplete registration. Please try again."
              dispatch({ type: EventRegistrationActions.UpdateError, payload: message })
            },
          },
        )
      }
    })
  }

  const { mutate: confirmPayment } = useMutation(
    ({ paymentId, registrationId, paymentMethodId, saveCard }) => {
      return client(`payments/${paymentId}/confirm/`, {
        method: "PUT",
        data: {
          registrationId,
          paymentMethodId,
          saveCard,
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["event-registration-slots", eventId])
      },
    },
  )

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

  const addPlayer = React.useCallback(
    (slot, player) => {
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
          },
        },
      )
    },
    [updateRegistrationSlotPlayer, queryClient, eventId],
  )

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
    loadRegistration,
    createRegistration,
    updateRegistration,
    cancelRegistration,
    completeRegistration,
    resetRegistration,
    confirmPayment,
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
