import React from "react"

import { ReservedGrid } from "components/reserve/reserved"
import { OverlaySpinner } from "components/spinners"
import {
  IndexTab,
  Tabs,
} from "components/tabs"
import { useEventRegistrationSlots } from "hooks/event-hooks"
import { LoadReserveTables } from "models/reserve"

function ReservedGridPage({ clubEvent }) {
  const { data: slots } = useEventRegistrationSlots(clubEvent.id)
  const [selectedTableIndex, updateSelectedTableIndex] = React.useState(0)

  const reserveTables = clubEvent.canChoose ? LoadReserveTables(clubEvent, slots) : []

  return (
    <div className="row">
      <div className="col-12">
        <div>
          <OverlaySpinner loading={!Boolean(reserveTables[0])} />
          {Boolean(reserveTables[0]) && (
            <React.Fragment>
              <Tabs>
                {reserveTables.map((table, index) => {
                  return (
                    <IndexTab
                      key={table.course.id}
                      index={index}
                      selectedIndex={selectedTableIndex}
                      onSelect={(i) => updateSelectedTableIndex(i)}
                    >
                      {table.course.name}
                    </IndexTab>
                  )
                })}
              </Tabs>
              <ReservedGrid table={reserveTables[selectedTableIndex]} />
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReservedGridPage
