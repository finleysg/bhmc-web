import React from "react"

import { EventView } from "components/events/event-view"
import { ReserveView } from "components/reserve/reserve-view"
import { useEventRegistration } from "context/registration-context"
import { usePlayer, useRegistrationStatus } from "hooks/account-hooks"
import { useEventRegistrationSlots } from "hooks/event-hooks"
import { useSettings } from "hooks/use-settings"
import { LoadReserveTables } from "models/reserve"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"

import { RegisterView } from "./register-view"

function EventRegistrationManager({ clubEvent }) {
  const { seasonEventId } = useSettings()
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
  const isMember = useRegistrationStatus(seasonEventId)
  const queryClient = useQueryClient()

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
    if (error) {
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
    loadRegistration(player.id)
      .then(() => {
        setMode("edit")
        setCurrentView("register-view")
      })
      .catch((err) => {
        // TODO: suss out the underlying cause of the issue at ln 82 of the reducer
        toast.warning(`Something went wrong: ${err}. Reloading should fix it.`)
        setTimeout(() => {
          window.location.assign(window.location)
        }, 2000)
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

  const handleRefresh = () => {
    queryClient.invalidateQueries(["event-registration-slots", clubEvent.id])
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
    return (
      <ReserveView
        reserveTables={reserveTables}
        onReserve={handleReserve}
        onRefresh={handleRefresh}
        onBack={() => setCurrentView("event-view")}
      />
    )
  } else if (currentView === "register-view") {
    return <RegisterView selectedStart={selectedStart} onCancel={handleCancel} mode={mode} />
  }
}

export default EventRegistrationManager
