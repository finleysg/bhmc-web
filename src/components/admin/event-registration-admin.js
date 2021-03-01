import React from "react"

import { ReserveView } from "components/reserve/reserve-view"
import { useEventAdmin } from "context/admin-context"
import { useEventRegistrationSlots } from "hooks/event-hooks"
import { LoadReserveTables } from "models/reserve"
import { toast } from "react-toastify"

import { RegisterAdmin } from "./register-admin"

function EventRegistrationAdmin({ clubEvent }) {
  const [currentView, setCurrentView] = React.useState("")
  const [selectedStart, setSelectedStart] = React.useState("")
  const { error, completeRegistration, createRegistration } = useEventAdmin()

  const { data: slots } = useEventRegistrationSlots(clubEvent.id)
  const reserveTables = clubEvent.canChoose ? LoadReserveTables(clubEvent, slots) : []

  const startRegistration = React.useCallback(() => {
    if (clubEvent.canChoose) {
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
  }, [clubEvent, createRegistration])

  React.useEffect(() => {
    if (Boolean(clubEvent.id)) {
      startRegistration()
    }
    return () => completeRegistration()
  }, [clubEvent, completeRegistration, startRegistration])

  React.useEffect(() => {
    if (Boolean(error)) {
      toast.error(`💥 Aww, snap! ${error}`, {
        position: "top-right",
        closeOnClick: true,
        autoClose: 5000,
      })
      // resetRegistration()
    }
  }, [error])

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

  if (currentView === "reserve-view") {
    return <ReserveView reserveTables={reserveTables} onReserve={handleReserve} />
  } else if (currentView === "register-view") {
    return <RegisterAdmin selectedStart={selectedStart} onCancel={handleCancel} />
  } else {
    return null
  }
}

export default EventRegistrationAdmin
