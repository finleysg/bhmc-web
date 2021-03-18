/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"

import React from "react"

import { AdminDelete } from "components/button/admin-buttons"
import { ReservedPlayer } from "components/reserve/reserved-list"
import { OverlaySpinner } from "components/spinners"
import {
  useDropPlayers,
  useIssueRefunds,
} from "hooks/admin-hooks"
import { useEventRegistrations } from "hooks/event-hooks"
import { ReserveSlot } from "models/reserve"
import { toast } from "react-toastify"
import { createRefunds } from "utils/payment-utils"

import DropPlayers from "./drop-players"

const PlayerContainerCss = {
  position: "relative",
  padding: 0,
  margin: "5px",
  width: "160px",
  display: "inline-block",
}

function RegisteredAdmin({ clubEvent }) {
  const [selectedSlots, updateSelectedSlots] = React.useState([])
  const [showDrop, setShowDrop] = React.useState(false)
  const [busy, setBusy] = React.useState(false)
  const dropRef = React.useRef()

  const registrations = useEventRegistrations(clubEvent.id)
  const { mutate: dropPlayers } = useDropPlayers()
  const issueRefunds = useIssueRefunds()

  const handleCancel = () => {
    setShowDrop(false)
  }

  const handleDrop = (player) => {
    const slot = new ReserveSlot("", player.slot.obj)
    updateSelectedSlots([slot])
    setShowDrop(true)
  }

  const handleDropConfirm = (dropSlots, dropNotes) => {
    const registrationId = dropSlots[0].registrationId
    const slotIds = dropSlots.map((slot) => slot.id)
    const refunds = createRefunds(dropSlots, dropNotes)
    setShowDrop(false)
    setBusy(true)

    issueRefunds(refunds)
      .then(() => dropPlayers({ registrationId, slotIds }))
      .catch((err) => toast.error("Failed to issue a refund: " + err))
      .finally(() => setBusy(false))
  }

  const getPlayers = React.useCallback(() => {
    const registered = []
    registrations.forEach((r) => {
      r.slots
        .filter((r) => r.status === "R")
        .forEach((s) => {
          registered.push({
            id: s.playerId,
            name: s.playerName,
            sortName: s.playerName.toUpperCase(),
            signedUpBy: r.signedUpBy,
            signupDate: r.createdDate,
            registrationId: r.id,
            slot: s,
          })
        })
    })

    return registered.sort((a, b) => {
      if (a.sortName < b.sortName) {
        return -1
      }
      if (a.sortName > b.sortName) {
        return 1
      }
      return 0
    })
  }, [registrations])

  return (
    <div className="card">
      <div className="card-body">
        <OverlaySpinner loading={busy} />
        <h4 className="card-title text-primary">Drop Players</h4>
        {getPlayers().map((p) => {
          return (
            <div css={PlayerContainerCss}>
              <AdminDelete
                onDelete={() => handleDrop(p)}
                style={{ top: "8px", right: 0, backgroundColor: "#ffffff" }}
              />
              <ReservedPlayer key={p.id} playerRegistration={p} isLink={false} />
            </div>
          )
        })}
      </div>
      {showDrop && (
        <DropPlayers
          dropRef={dropRef}
          clubEvent={clubEvent}
          slots={selectedSlots}
          onCancel={handleCancel}
          onDrop={handleDropConfirm}
        />
      )}
    </div>
  )
}

export { RegisteredAdmin }
