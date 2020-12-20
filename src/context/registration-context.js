import React from "react"

import { ClubEvent } from "models/club-event"
import { Payment } from "models/payment"
import { Registration } from "models/registration"
import { queryCache, useMutation, useQuery } from "react-query"

import { useAuth, useClient } from "./auth-context"

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
  const [clubEvent, setClubEvent] = React.useState()
  const [registration, setRegistration] = React.useState()
  const [payment, setPayment] = React.useState()
  const [error, setError] = React.useState()
  const [currentStep, changeCurrentStep] = React.useState(RegistrationSteps.Pending)

  const { user } = useAuth()
  const client = useClient()

  const loadEvent = React.useCallback(
    async (id) => {
      return client(`events/${id}`)
        .then((data) => setClubEvent(new ClubEvent(data)))
        .then(() => {
          queryCache.invalidateQueries("registration")
          queryCache.invalidateQueries("payment")
        })
    },
    [client],
  )

  useQuery(
    ["registration", clubEvent?.id],
    () => {
      if (user && user.is_authenticated && clubEvent && clubEvent.id) {
        return client(`registration/?event_id=${clubEvent.id}&player=me`).then((data) => data[0])
      }
    },
    {
      initialData: () => {
        return queryCache.getQueryData("registration")?.find((r) => r.eventId === clubEvent.id)
      },
      staleTime: 1000 * 60 * 15,
      cacheTime: 1000 * 60 * 15,
      onSuccess: (data) => {
        if (data) {
          setRegistration(new Registration(data))
        }
      },
    },
  )

  useQuery(
    ["payment", clubEvent?.id],
    () => {
      if (user && user.is_authenticated && clubEvent && clubEvent.id) {
        return client(`payments/?event=${clubEvent.id}&player=me`).then((data) => data[0])
      }
    },
    {
      initialData: () => {
        return queryCache.getQueryData("payment")?.find((r) => r.eventId === clubEvent.id)
      },
      staleTime: 1000 * 60 * 15,
      cacheTime: 1000 * 60 * 15,
      onSuccess: (data) => {
        if (data) {
          setPayment(new Payment(data))
        }
      },
    },
  )

  const [createRegistration] = useMutation(
    (registration) => {
      return client("registration", {
        data: {
          event: clubEvent.id,
          course: registration.courseId,
          slots: registration.slots.map((s) => s.obj),
        },
      })
    },
    {
      onSuccess: (data, variables) => {
        setRegistration(new Registration(data))
        queryCache.setQueryData(["registration", variables.eventId], data)
      },
      onError: (error) => {
        setError(error)
      },
    },
  )

  const [updateRegistration] = useMutation(
    (registration) => {
      return client(`registration/${registration.id}`, {
        method: "PUT",
        data: {
          event: clubEvent.id,
          course: registration.courseId,
          notes: registration.notes,
          slots: registration.slots.map((s) => s.obj),
        },
      })
    },
    {
      onSuccess: (data, variables) => {
        setRegistration(new Registration(data))
        queryCache.setQueryData(["registration", variables.eventId], data)
      },
      onError: (error) => {
        setError(error)
      },
    },
  )

  const [cancelRegistration] = useMutation(
    (registrationId) => {
      return client(`registration/${registrationId}/cancel`, {
        method: "PUT",
      })
    },
    {
      onSettled: () => {
        queryCache.invalidateQueries("registration", { refetchActive: false })
        if (payment && payment.id) {
          queryCache.invalidateQueries("payment", { refetchActive: false })
          deletePayment(payment.id)
        }
        setError(undefined)
        changeCurrentStep(RegistrationSteps.Pending)
      },
    },
  )

  const [createPayment] = useMutation(
    (payment) => {
      return client("payments", {
        data: {
          event: clubEvent.id,
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
        setPayment(new Payment(data))
        queryCache.setQueryData(["payment", variables.eventId], data)
      },
      onError: (error) => {
        setError(error)
      },
    },
  )

  const [updatePayment] = useMutation(
    (payment) => {
      return client(`payments/${payment.id}`, {
        method: "PUT",
        data: {
          event: clubEvent.id,
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
        setPayment(new Payment(data))
        queryCache.setQueryData(["payment", variables.eventId], data)
      },
      onError: (error) => {
        setError(error)
      },
    },
  )

  const [deletePayment] = useMutation(
    (paymentId) => {
      return client(`payments/${paymentId}`, {
        method: "DELETE",
      })
    },
    {
      onSettled: () => {
        queryCache.invalidateQueries("payment", { refetchActive: false })
      },
      onError: (error) => {
        // Clear this error, otherwise we will be stuck in an unrecoverable state.
        // Most likely, we don't have a payment to delete.
        console.error(error)
        setError(undefined)
      },
    },
  )

  const startRegistration = React.useCallback(() => {
    if (registration && registration.id) {
      changeCurrentStep(RegistrationSteps.Register)
    } else {
      const reg = {
        slots: [],
      }
      createRegistration(reg).then(changeCurrentStep(RegistrationSteps.Register))
    }
  }, [registration, createRegistration])

  const updateStep = React.useCallback((step) => {
    changeCurrentStep(step)
  }, [])

  const value = {
    clubEvent,
    registration,
    payment,
    error,
    currentStep,
    loadEvent,
    startRegistration,
    createRegistration,
    updateRegistration,
    cancelRegistration,
    createPayment,
    updatePayment,
    deletePayment,
    updateStep,
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