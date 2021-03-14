import React from "react"

import { OverlaySpinner } from "components/spinners"
import { toast } from "react-toastify"

import { ReserveRowAdmin } from "./reserve-row-admin"

function ReserveGridAdmin({ table, error, onDrop, onMove, ...rest }) {
  const [selectedSlots, updateSelectedSlots] = React.useState([])
  const [selectedRegistration, setSelectedRegistration] = React.useState(0)
  const [mode, setMode] = React.useState("select")

  const handlePlayerSelect = (slot) => {
    setSelectedRegistration(slot.registrationId)
    const currentlySelected = []
    updateSelectedSlots(currentlySelected) // clears previous selections
    slot.selected = !slot.selected
    if (slot.selected) {
      currentlySelected.push(slot)
    }
    updateSelectedSlots(currentlySelected)
  }

  const handleGroupSelect = (registrationId) => {
    setSelectedRegistration(registrationId)
    const slots = table.findSlotsByRegistrationId(registrationId)
    const currentlySelected = []
    updateSelectedSlots(currentlySelected) // clears previous selections
    slots.forEach((slot) => {
      slot.selected = true
      currentlySelected.push(slot)
    })
    updateSelectedSlots(currentlySelected)
  }

  const handleDrop = () => {
    if (selectedSlots?.length > 0) {
      onDrop(selectedSlots)
    }
  }

  const handleMove = () => {
    if (selectedSlots?.length > 0) {
      if (mode === "select") {
        setMode("move")
      } else {
        updateSelectedSlots([])
        setMode("select")
      }
    }
  }

  const handleMoveConfirm = (group) => {
    const availableSlots = group.slots.filter((slot) => slot.status === "A")
    if (selectedSlots.length > availableSlots.length) {
      toast.error("There is not enough room!")
    } else {
      try {
        onMove({
          registrationId: selectedRegistration,
          sourceSlots: selectedSlots,
          destinationSlots: availableSlots.slice(0, selectedSlots.length),
        })
      } finally {
        updateSelectedSlots([])
        setMode("select")
      }
    }
  }

  // ensure the selected-slot state is applied
  if (Boolean(table)) {
    table.applySelectedSlots(selectedSlots)
  }

  return (
    <div className="card" style={{ padding: "1rem" }} {...rest}>
      <OverlaySpinner loading={!Boolean(table)} />
      {Boolean(table) &&
        table.groups.map((group) => (
          <ReserveRowAdmin
            key={group.name}
            courseName={table.course.name}
            group={group}
            mode={mode}
            onPlayerSelect={handlePlayerSelect}
            onGroupSelect={handleGroupSelect}
            onDrop={handleDrop}
            onMove={handleMove}
            onMoveConfirm={handleMoveConfirm}
          />
        ))}
    </div>
  )
}

export { ReserveGridAdmin }
