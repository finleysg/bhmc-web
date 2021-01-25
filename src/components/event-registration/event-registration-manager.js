import * as Sentry from "@sentry/react"

import React from "react"

import { RegistrationErrorFallback } from "components/errors"
import { EventView } from "components/events/event-view"
import { ReserveView } from "components/reserve/reserve-view"
import { useEventRegistration } from "context/registration-context"
import { useEventRegistrationSlots } from "hooks/event-hooks"
import { LoadReserveTables } from "models/reserve"

import { RegisterView } from "./register-view"

function EventRegistrationManager({ clubEvent }) {
  const [currentView, setCurrentView] = React.useState("event-view")
  const { data: slots } = useEventRegistrationSlots(clubEvent.id)
  const { cancelRegistration, loadEvent, registration, startRegistration } = useEventRegistration()
  const reserveTables = LoadReserveTables(clubEvent, slots)

  React.useEffect(() => {
    loadEvent(clubEvent.id)
  }, [loadEvent, clubEvent])

  const handleStart = () => {
    if (clubEvent.canChoose) {
      // If something went wrong earlier, we need to clean up
      if (registration && registration.id) {
        cancelRegistration(registration.id)
      }
      setCurrentView("reserve-view")
    } else {
      const reg = {
        eventId: clubEvent.id,
        slots: [],
      }
      startRegistration(reg)
      setCurrentView("register-view")
    }
  }

  const handleReserve = (course, slots) => {
    const reg = {
      eventId: clubEvent.id,
      courseId: course.id,
      slots: slots.map((slot) => slot.toRegistrationSlot()),
    }
    startRegistration(reg)
    setCurrentView("register-view")
  }

  const handleCancel = () => {
    setCurrentView("event-view")
  }

  const handleReset = () => {
    if (registration && registration.id) {
      cancelRegistration(registration.id)
    }
    window.location.assign(window.location)
  }

  if (currentView === "event-view") {
    return <EventView clubEvent={clubEvent} onRegister={handleStart} />
  } else if (currentView === "reserve-view") {
    return <ReserveView reserveTables={reserveTables} onReserve={handleReserve} />
  } else if (currentView === "register-view") {
    return (
      <Sentry.ErrorBoundary
        fallback={<RegistrationErrorFallback resetErrorBoundary={handleReset} />}
      >
        <RegisterView onCancel={handleCancel} />
      </Sentry.ErrorBoundary>
    )
  }
}

export default EventRegistrationManager
