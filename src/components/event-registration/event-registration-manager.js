import React from "react"

import { EventView } from "components/events/event-view"
import { ReserveView } from "components/reserve/reserve-view"
import { useEventRegistration } from "context/registration-context"
import { useEventRegistrationSlots } from "hooks/event-hooks"
import { LoadReserveTables } from "models/reserve"
import { toast } from "react-toastify"

import { RegisterView } from "./register-view"

function EventRegistrationManager({ clubEvent }) {
  const [currentView, setCurrentView] = React.useState("event-view")
  const [selectedStart, setSelectedStart] = React.useState("")
  const {
    error,
    cancelRegistration,
    completeRegistration,
    createRegistration,
    resetRegistration,
    loadEvent,
    registration,
  } = useEventRegistration()
  const { data: slots } = useEventRegistrationSlots(clubEvent.id)

  const openings = () => {
    if (clubEvent.canChoose) {
      const filled = slots?.filter((s) => s.status !== "A")?.length ?? 0
      return slots?.length - filled
    } else {
      const filled = slots?.filter((s) => s.status === "R")?.length ?? 0
      return clubEvent.registrationMaximum - filled
    }
  }

  const reserveTables = clubEvent.canChoose ? LoadReserveTables(clubEvent, slots) : []

  React.useEffect(() => {
    loadEvent(clubEvent.id)
    return () => completeRegistration()
  }, [loadEvent, clubEvent, completeRegistration])

  React.useEffect(() => {
    if (Boolean(error)) {
      toast.error(`💥 Aww, snap! ${error}`, {
        position: "top-right",
        closeOnClick: true,
        autoClose: 5000,
      })
      resetRegistration()
    }
  }, [error, resetRegistration])

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
      createRegistration(reg, {
        onSuccess: () => {
          setSelectedStart(clubEvent.name)
          setCurrentView("register-view")
        },
      })
    }
  }

  const handleReserve = (course, groupName, slots) => {
    const reg = {
      eventId: clubEvent.id,
      courseId: course.id,
      slots: slots.map((slot) => slot.toRegistrationSlot()),
    }
    createRegistration(reg, {
      onSuccess: () => {
        setSelectedStart(`${clubEvent.name}: ${course.name} ${groupName}`)
        setCurrentView("register-view")
      },
    })
  }

  const handleCancel = () => {
    setCurrentView("event-view")
  }

  if (currentView === "event-view") {
    return <EventView clubEvent={clubEvent} openings={openings()} onRegister={handleStart} />
  } else if (currentView === "reserve-view") {
    return <ReserveView reserveTables={reserveTables} onReserve={handleReserve} />
  } else if (currentView === "register-view") {
    return <RegisterView selectedStart={selectedStart} onCancel={handleCancel} />
  }
}

export default EventRegistrationManager
