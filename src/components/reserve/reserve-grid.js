import React from "react"

import { IconActionButton } from "components/button/buttons"
import {
  TiArrowBack,
  TiRefresh,
} from "react-icons/ti"

import { ReserveRow } from "./reserve-row"

function ReserveGrid({ table, error, mode, onReserve, onRefresh, onBack, ...rest }) {
  const [selectedSlots, updateSelectedSlots] = React.useState([])
  // const { error } = useEventRegistration()

  // TODO: make sure we don't need to actually check the error.
  // I'm assuming it means the selected slots have already been taken.
  React.useEffect(() => {
    if (error) {
      updateSelectedSlots([])
    }
  }, [error])

  const handleSingleSelect = (slot) => {
    if (mode !== "register") {
      return
    }
    const currentlySelected = selectedSlots.filter((ss) => ss.groupId === slot.groupId).slice(0)
    updateSelectedSlots(currentlySelected) // clears previous selections in other groups
    slot.selected = !slot.selected
    if (slot.selected) {
      currentlySelected.push(slot)
    } else {
      const index = currentlySelected.findIndex((s) => s.id === slot.id)
      currentlySelected.splice(index, 1)
    }
    updateSelectedSlots(currentlySelected)
  }

  const handleSelect = (slots) => {
    if (mode !== "register") {
      return
    }
    if (slots.length === 1) {
      handleSingleSelect(slots[0])
    } else {
      const currentlySelected = []
      updateSelectedSlots(currentlySelected) // clears previous selections
      slots.forEach((slot) => {
        if (slot.canSelect()) {
          slot.selected = true
          currentlySelected.push(slot)
        }
      })
      updateSelectedSlots(currentlySelected)
    }
  }

  const handleReserve = (groupName) => {
    if (selectedSlots?.length > 0) {
      onReserve(table.course, groupName, selectedSlots)
    }
  }

  // ensure the selected-slot state is applied
  table.applySelectedSlots(selectedSlots)

  return (
    <div className="card" style={{ padding: "1rem" }} {...rest}>
      <div>
        <span className="mr-2">
          <IconActionButton onAction={onBack} label="back">
            <TiArrowBack />
          </IconActionButton>
        </span>
        <span>
          <IconActionButton onAction={onRefresh} label="refresh">
            <TiRefresh />
          </IconActionButton>
        </span>
      </div>
      {table.groups.map((group) => (
        <ReserveRow
          key={group.name}
          mode={mode}
          courseName={table.course.name}
          group={group}
          onSelect={handleSelect}
          onReserve={handleReserve}
        />
      ))}
    </div>
  )
}

export { ReserveGrid }
