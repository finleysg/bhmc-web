import React from "react"

import { ClubEvent } from "models/club-event"
import { Payment } from "models/payment"
import { Registration } from "models/registration"
import { queryCache, useIsFetching, useMutation, useQuery } from "react-query"

import { useAuth, useClient } from "./auth-context"

const EventRegistrationContext = React.createContext()
EventRegistrationContext.displayName = "EventRegistrationContext"

function EventRegistrationProvider(props) {
  const [clubEvent, setClubEvent] = React.useState()
  const [registration, setRegistration] = React.useState()
  const [payment, setPayment] = React.useState()
  const [error, setError] = React.useState()

  const { user } = useAuth()
  const client = useClient()
  const isFetching = useIsFetching()

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
      if (user.is_authenticated && clubEvent && clubEvent.id) {
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
      if (user.is_authenticated && clubEvent && clubEvent.id) {
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
          deletePayment(payment.id)
        }
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
        setError(error)
      },
    },
  )
  //   const value = React.useMemo(
  //     () => ({
  //       clubEvent,
  //       registration: new Registration(registrationData ?? {}),
  //       payment: new Payment(paymentData ?? {}),
  //       loadEvent,
  //       createRegistration,
  //       updateRegistration,
  //       cancelRegistration,
  //       createPayment,
  //       updatePayment,
  //     }),
  //     [
  //       clubEvent,
  //       registrationData,
  //       paymentData,
  //       loadEvent,
  //       createRegistration,
  //       updateRegistration,
  //       cancelRegistration,
  //       createPayment,
  //       updatePayment,
  //     ],
  //   )

  const value = {
    clubEvent,
    registration,
    payment,
    error,
    isFetching,
    loadEvent,
    createRegistration,
    updateRegistration,
    cancelRegistration,
    createPayment,
    updatePayment,
    deletePayment,
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

export { EventRegistrationProvider, useEventRegistration }
