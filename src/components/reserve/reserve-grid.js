import React from "react"

// import { useEventRegistration } from "context/registration-context"
import { ReserveRow } from "./reserve-row"

function ReserveGrid({ table, error, onReserve, ...rest }) {
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
      {table.groups.map((group) => (
        <ReserveRow
          key={group.name}
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
