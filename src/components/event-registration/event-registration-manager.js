import React from "react"

import { EventView } from "components/events/event-view"
import { ReserveView } from "components/reserve/reserve-view"
import { useEventRegistration } from "context/registration-context"
import {
  usePlayer,
  useRegistrationStatus,
} from "hooks/account-hooks"
import { useEventRegistrationSlots } from "hooks/event-hooks"
import { LoadReserveTables } from "models/reserve"
import { toast } from "react-toastify"
import * as config from "utils/app-config"

import { RegisterView } from "./register-view"

function EventRegistrationManager({ clubEvent }) {
  const [currentView, setCurrentView] = React.useState("event-view")
  const [mode, setMode] = React.useState("new")
  const [selectedStart, setSelectedStart] = React.useState("")

  const player = usePlayer()
  const {
    error,
    completeRegistration,
    createRegistration,
    loadRegistration,
    resetRegistration,
    loadEvent,
  } = useEventRegistration()
  const { data: slots } = useEventRegistrationSlots(clubEvent.id)
  const hasSignedUp = useRegistrationStatus(clubEvent.id)
  const isMember = useRegistrationStatus(config.seasonEventId)

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
      if (error.indexOf("Please try again") >= 0) {
        toast.warning(`🧹 Oops! ${error}`, {
          position: "top-right",
          closeOnClick: true,
          autoClose: 5000,
        })
      } else {
        toast.error(`💥 Aww, snap! ${error}`, {
          position: "top-right",
          closeOnClick: true,
          autoClose: 5000,
        })
      }
      resetRegistration()
    }
  }, [error, resetRegistration])

  const handleStart = () => {
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
  }

  const handleEdit = () => {
    loadRegistration(player.id).then(() => {
      setMode("edit")
      setCurrentView("register-view")
    })
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

  // TODO: if there are no slots created and the event is a can_choose event, we cannot
  // continue. Throw a big fat warning --> admin needs to fix this scenario.
  if (currentView === "event-view") {
    return (
      <EventView
        clubEvent={clubEvent}
        openings={openings()}
        onRegister={handleStart}
        onEditRegistration={handleEdit}
        hasSignedUp={hasSignedUp}
        isMember={isMember}
      />
    )
  } else if (currentView === "reserve-view") {
    return <ReserveView reserveTables={reserveTables} onReserve={handleReserve} />
  } else if (currentView === "register-view") {
    return <RegisterView selectedStart={selectedStart} onCancel={handleCancel} mode={mode} />
  }
}

export default EventRegistrationManager
