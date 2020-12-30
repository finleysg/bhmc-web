import React from "react"

import { format, isAfter, isBefore } from "date-fns"
import { usePlayers } from "hooks/player-hooks"

function SimpleRegistrationList({ registrations, sortBy }) {
  const players = usePlayers()

  const getPlayers = React.useCallback(() => {
    const registered = []
    if (players && players.length > 0) {
      registrations.forEach((r) => {
        r.slots.forEach((s) => {
          const player = players.find((p) => p.id === s.playerId)
          registered.push({
            id: player.id,
            name: player.name,
            sortName: `${player.obj.last_name}${player.obj.first_name}`.toUpperCase(),
            signedUpBy: r.signedUpBy,
            signupDate: r.createdDate,
          })
        })
      })

      if (sortBy === "player") {
        return registered.sort((a, b) => {
          if (a.sortName < b.sortName) {
            return -1
          }
          if (a.sortName > b.sortName) {
            return 1
          }
          return 0
        })
      } else {
        return registered.sort((a, b) => {
          if (isBefore(a.signupDate, b.signupDate)) {
            return -1
          }
          if (isAfter(a.signupDate, b.signupDate)) {
            return 1
          }
          return 0
        })
      }
    }
    return registered
  }, [registrations, players, sortBy])

  return (
    <div>
      {getPlayers().map((p) => {
        return <RegistrationSlotView key={p.id} playerRegistration={p} />
      })}
    </div>
  )
}

function RegistrationSlotView({ playerRegistration, ...rest }) {
  return (
    <div
      style={{
        border: "1px solid #495057",
        padding: "5px",
        margin: "5px",
        width: "160px",
        display: "inline-block",
      }}
      {...rest}
    >
      <p className="text-success" style={{ margin: 0, padding: "5px 0", fontWeight: "bold" }}>
        {playerRegistration.name}
      </p>
      <p className="text-muted" style={{ fontSize: ".8rem", margin: 0 }}>
        Signed up by {playerRegistration.signedUpBy} on{" "}
        {format(playerRegistration.signupDate, "MM/dd/yyyy h:mm aaaa")}
      </p>
    </div>
  )
}

export { RegistrationSlotView, SimpleRegistrationList }
