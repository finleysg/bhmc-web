import React from "react"

import { useAuth } from "context/auth-context"
import {
  format,
  isAfter,
  isBefore,
} from "date-fns"
import { Link } from "react-router-dom"

function ReservedList({ registrations, sortBy }) {
  const { user } = useAuth()

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
  }, [registrations, sortBy])

  return (
    <div>
      {getPlayers().map((p) => {
        return <ReservedPlayer key={p.id} playerRegistration={p} isLink={user?.is_authenticated} />
      })}
    </div>
  )
}

function ReservedPlayer({ playerRegistration, isLink, ...rest }) {
  const slot = () => {
    return (
      <div className="reserve-player" {...rest}>
        <p className="text-success" style={{ margin: 0, padding: "5px 0", fontWeight: "bold" }}>
          {playerRegistration.name}
        </p>
        <p className="text-muted" style={{ fontSize: ".75rem", margin: 0 }}>
          Signed up by {playerRegistration.signedUpBy} on{" "}
          {format(playerRegistration.signupDate, "MM/dd/yyyy h:mm aaaa")}
        </p>
      </div>
    )
  }

  if (Boolean(isLink)) {
    return <Link to={`/directory/${playerRegistration.id}`}>{slot()}</Link>
  }
  return slot()
}

export { ReservedList, ReservedPlayer }
