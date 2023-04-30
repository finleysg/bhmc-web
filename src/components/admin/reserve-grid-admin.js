import React from "react"

import { OverlaySpinner } from "components/spinners"
import { toast } from "react-toastify"
import { createRefunds } from "utils/payment-utils"

import DropPlayers from "./drop-players"
import { ReserveRowAdmin } from "./reserve-row-admin"
import SwapPlayer from "./swap-players"

function ReserveGridAdmin({ clubEvent, table, error, onMove, onDrop, onSwap, ...rest }) {
  const [selectedSlots, updateSelectedSlots] = React.useState([])
  const [selectedRegistration, setSelectedRegistration] = React.useState(0)
  const [mode, setMode] = React.useState("select")
  const [showDrop, setShowDrop] = React.useState(false)
  const [showSwap, setShowSwap] = React.useState(false)

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
      setShowDrop(true)
    }
  }

  const handleSwap = () => {
    if (selectedSlots?.length > 0) {
      setShowSwap(true)
    }
  }

  const handleDropConfirm = (dropSlots, dropNotes) => {
    try {
      const slotIds = dropSlots.map((slot) => slot.id)
      const refunds = createRefunds(dropSlots, dropNotes)
      onDrop({ registrationId: selectedRegistration, slotIds, refunds })
    } finally {
      setShowDrop(false)
      updateSelectedSlots([])
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

  const handleSwapConfirm = (player) => {
    setShowSwap(false)
    try {
      onSwap({ slot: selectedSlots[0], player })
    } finally {
      updateSelectedSlots([])
      setMode("select")
    }
  }

  const handleCancel = () => {
    updateSelectedSlots([])
    setShowDrop(false)
    setShowSwap(false)
    setMode("select")
  }

  // ensure the selected-slot state is applied
  if (table) {
    table.applySelectedSlots(selectedSlots)
  }

  return (
    <div className="card" style={{ padding: "1rem" }} {...rest}>
      <OverlaySpinner loading={!table} />
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
            onSwap={handleSwap}
            onMove={handleMove}
            onMoveConfirm={handleMoveConfirm}
          />
        ))}
      <DropPlayers
        showDrop={showDrop}
        clubEvent={clubEvent}
        slots={selectedSlots}
        onCancel={handleCancel}
        onDrop={handleDropConfirm}
      />
      <SwapPlayer
        showSwap={showSwap}
        clubEvent={clubEvent}
        selectedSlot={selectedSlots[0]}
        onCancel={handleCancel}
        onSwap={handleSwapConfirm}
      />
    </div>
  )
}

export { ReserveGridAdmin }
