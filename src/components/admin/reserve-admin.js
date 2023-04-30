import React from "react"

import { OverlaySpinner } from "components/spinners"
import { IndexTab, Tabs } from "components/tabs"
import { useDropPlayers, useIssueRefunds, useMovePlayers, useSwapPlayers } from "hooks/admin-hooks"
import { toast } from "react-toastify"

import { ReserveGridAdmin } from "./reserve-grid-admin"

function ReserveAdmin({ clubEvent, reserveTables }) {
  const [selectedTableIndex, updateSelectedTableIndex] = React.useState(0)
  const [busy, setBusy] = React.useState(false)

  const { mutate: movePlayers } = useMovePlayers()
  const { mutate: dropPlayers } = useDropPlayers()
  const { mutate: swapPlayers } = useSwapPlayers()
  const issueRefunds = useIssueRefunds()

  const handleMove = ({ registrationId, sourceSlots, destinationSlots }) => {
    movePlayers({
      registrationId,
      sourceSlotIds: sourceSlots.map((s) => s.id),
      destinationSlotIds: destinationSlots.map((d) => d.id),
    })
  }

  const handleDrop = ({ registrationId, slotIds, refunds }) => {
    setBusy(true)
    issueRefunds(refunds)
      .then(() => dropPlayers({ registrationId, slotIds }))
      .catch((err) => toast.error("Failed to issue a refund: " + err))
      .finally(() => setBusy(false))
  }

  const handleSwap = ({ slot, player }) => {
    setBusy(true)
    try {
      swapPlayers({ slotId: slot.id, playerId: player.id })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="row">
      <div className="col-12">
        <OverlaySpinner loading={busy} />
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
            onSwap={handleSwap}
          />
        </div>
      </div>
    </div>
  )
}

export { ReserveAdmin }
