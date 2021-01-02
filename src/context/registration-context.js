import React from "react"

import { useClubEvents } from "hooks/event-hooks"
import { Payment } from "models/payment"
import { Registration } from "models/registration"
import { useMutation, useQuery, useQueryClient } from "react-query"

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
  // TODO: use a reducer
  const [clubEvent, setClubEvent] = React.useState()
  const [registration, setRegistration] = React.useState()
  const [payment, setPayment] = React.useState()
  const [error, setError] = React.useState()
  const [currentStep, changeCurrentStep] = React.useState(RegistrationSteps.Pending)

  const { user } = useAuth()
  const events = useClubEvents()
  const client = useClient()
  const queryClient = useQueryClient()

  const loadEvent = React.useCallback(
    (id) => {
      const event = events.find((evt) => evt.id === id)
      if (event) {
        setClubEvent(event)
      }
    },
    [events],
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
        const queryData = queryClient.getQueryData("registration")
        if (queryData !== undefined) {
          if (Array.isArray(queryData)) {
            return queryData.find((r) => r.event === clubEvent.id)
          }
          return queryData
        }
      },
      staleTime: 1000 * 60 * 15,
      cacheTime: 1000 * 60 * 15,
      onSuccess: (data) => {
        if (data) {
          setRegistration(new Registration(data))
        }
      },
      onError: (error) => setError(error),
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
        const queryData = queryClient.getQueryData("payment")
        if (queryData !== undefined) {
          if (Array.isArray(queryData)) {
            return queryData.find((r) => r.event === clubEvent.id)
          }
          return queryData
        }
      },
      staleTime: 1000 * 60 * 15,
      cacheTime: 1000 * 60 * 15,
      onSuccess: (data) => {
        if (data) {
          setPayment(new Payment(data))
        } else {
          setPayment(undefined)
        }
      },
      onError: (error) => setError(error),
    },
  )

  const { mutate: createRegistration } = useMutation(
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
        changeCurrentStep(RegistrationSteps.Register)
        queryClient.setQueryData(["registration", variables.eventId], data)
      },
      onError: (error) => {
        setError(error)
      },
    },
  )

  const { mutate: updateRegistration } = useMutation(
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
        queryClient.setQueryData(["registration", variables.eventId], data)
      },
      onError: (error) => {
        setError(error)
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
        if (payment && payment.id) {
          queryClient.invalidateQueries("payment", { refetchActive: false })
          deletePayment(payment.id)
        }
        changeCurrentStep(RegistrationSteps.Pending)
        setPayment(undefined)
        setRegistration(undefined)
        setError(undefined)
      },
    },
  )

  const { mutate: createPayment } = useMutation(
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
        queryClient.setQueryData(["payment", variables.eventId], data)
      },
      onError: (error) => {
        setError(error)
      },
    },
  )

  const { mutate: updatePayment } = useMutation(
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
        queryClient.setQueryData(["payment", variables.eventId], data)
      },
      onError: (error) => {
        setError(error)
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
      createRegistration(reg)
    }
  }, [registration, createRegistration])

  const updateStep = React.useCallback((step) => {
    changeCurrentStep(step)
  }, [])

  const completeRegistration = React.useCallback(() => {
    queryClient.invalidateQueries("my-events", { refetchInactive: true })
    changeCurrentStep(RegistrationSteps.Pending)
    setClubEvent(undefined)
    setPayment(undefined)
    setRegistration(undefined)
    setError(undefined)
  }, [queryClient])

  const value = React.useMemo(
    () => ({
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
      completeRegistration,
      createPayment,
      updatePayment,
      deletePayment,
      updateStep,
    }),
    [
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
      completeRegistration,
      createPayment,
      updatePayment,
      deletePayment,
      updateStep,
    ],
  )

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
