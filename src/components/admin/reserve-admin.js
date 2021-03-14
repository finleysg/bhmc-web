import React from "react"

import {
  IndexTab,
  Tabs,
} from "components/tabs"
import { useMovePlayers } from "hooks/admin-hooks"

import { ReserveGridAdmin } from "./reserve-grid-admin"

function ReserveAdmin({ reserveTables }) {
  const [selectedTableIndex, updateSelectedTableIndex] = React.useState(0)
  const { mutate: movePlayers } = useMovePlayers()

  const handleMove = ({ registrationId, sourceSlots, destinationSlots }) => {
    movePlayers({
      registrationId: registrationId,
      sourceSlotIds: sourceSlots.map((s) => s.id),
      destinationSlotIds: destinationSlots.map((d) => d.id),
    })
  }

  return (
    <div className="row">
      <div className="col-12">
        <div>
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
          <ReserveGridAdmin table={reserveTables[selectedTableIndex]} onMove={handleMove} />
        </div>
      </div>
    </div>
  )
}

export { ReserveAdmin }
