import React from "react"

import { EventCopyForm } from "components/admin/event-copy-form"
import { OverlaySpinner } from "components/spinners"
import { useClubEvents } from "hooks/event-hooks"
import { useSettings } from "hooks/use-settings"

function AdminCopyEventPage() {
  const { currentSeason } = useSettings()
  const sourceEvents = useClubEvents(+currentSeason - 1)?.map((e) => {
    return {
      value: e.id,
      name: `${e.name} (${e.slugDate})`,
    }
  })

  return (
    <div className="row">
      <OverlaySpinner loading={!sourceEvents} />
      <div className="col-md-6 col-lg-4 col-xl-3">
        <h3 className="text-primary">Create New Events</h3>
        <p>
          Use this form to quickly create new events by copying previous events. Once copied, go to
          the event administration backend to make changes to the new event.
        </p>
        <EventCopyForm availableEvents={sourceEvents} />
      </div>
    </div>
  )
}

export default AdminCopyEventPage
