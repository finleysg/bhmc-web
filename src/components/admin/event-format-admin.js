import React from "react"

import { OverlaySpinner } from "components/spinners"
import { useEventPatch } from "hooks/admin-hooks"

import { TextEditor } from "./text-editor"

function EventFormatAdmin({ clubEvent }) {
  const { mutate: patchEvent, isLoading } = useEventPatch()

  const handleSave = (updatedFormat) => {
    patchEvent({
      id: clubEvent.id,
      notes: updatedFormat,
    })
  }

  return (
    <div className="card">
      <div className="card-body">
        <OverlaySpinner loading={isLoading} />
        <h4 className="card-title text-primary">Edit the Event Format</h4>
        <TextEditor text={clubEvent?.notes ?? ""} layout="side-by-side" onSave={handleSave} />
      </div>
    </div>
  )
}

export { EventFormatAdmin }
