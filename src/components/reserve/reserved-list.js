import React from "react"

import { useAuth } from "context/auth-context"
import { format, isAfter, isBefore } from "date-fns"
import { Link } from "react-router-dom"

function ReservedList({ registrations, sortBy }) {
  const { user } = useAuth()

  const sortByName = (playerA, playerB) => {
    if (playerA.sortName < playerB.sortName) {
      return -1
    }
    if (playerA.sortName > playerB.sortName) {
      return 1
    }
    return 0
  }

  const sortByDate = (playerA, playerB) => {
    if (isBefore(playerA.signupDate, playerB.signupDate)) {
      return -1
    }
    if (isAfter(playerA.signupDate, playerB.signupDate)) {
      return 1
    }
    return 0
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
            sortName: s.playerName?.toUpperCase(),
            signedUpBy: r.signedUpBy,
            signupDate: r.createdDate,
          })
        })
    })

    if (sortBy === "player") {
      return registered.sort((a, b) => sortByName(a, b))
    } else {
      return registered.sort((a, b) => sortByDate(a, b))
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

  if (isLink) {
    return <Link to={`/directory/${playerRegistration.id}`}>{slot()}</Link>
  }
  return slot()
}

export { ReservedList, ReservedPlayer }
