import React from "react"

import {
  IndexTab,
  Tabs,
} from "components/tabs"
import {
  useDropPlayers,
  useIssueRefunds,
  useMovePlayers,
} from "hooks/admin-hooks"
import { toast } from "react-toastify"

import { ReserveGridAdmin } from "./reserve-grid-admin"

function ReserveAdmin({ clubEvent, reserveTables }) {
  const [selectedTableIndex, updateSelectedTableIndex] = React.useState(0)
  const { mutate: movePlayers } = useMovePlayers()
  const { mutate: dropPlayers } = useDropPlayers()
  const issueRefunds = useIssueRefunds()

  const handleMove = ({ registrationId, sourceSlots, destinationSlots }) => {
    movePlayers({
      registrationId: registrationId,
      sourceSlotIds: sourceSlots.map((s) => s.id),
      destinationSlotIds: destinationSlots.map((d) => d.id),
    })
  }

  const handleDrop = ({ registrationId, slotIds, refunds }) => {
    issueRefunds(refunds)
      .then(() => dropPlayers({ registrationId, slotIds }))
      .catch((err) => toast.error("Failed to issue a refund: " + err))
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
          <ReserveGridAdmin
            clubEvent={clubEvent}
            table={reserveTables[selectedTableIndex]}
            onMove={handleMove}
            onDrop={handleDrop}
          />
        </div>
      </div>
    </div>
  )
}

export { ReserveAdmin }
