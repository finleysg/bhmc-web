import React from "react"

import { useAuth } from "context/auth-context"
import {
  format,
  isAfter,
  isBefore,
} from "date-fns"
import { Link } from "react-router-dom"

function ReservedGrid({ table, ...rest }) {
  return (
    <div className="card" style={{ padding: "1rem" }} {...rest}>
      {table.groups.map((group) => (
        <ReservedRow key={group.name} courseName={table.course.name} group={group} />
      ))}
    </div>
  )
}

function ReservedRow({ courseName, group, onSelect, onReserve, ...rest }) {
  return (
    <div className={`reserve-group reserve-group__${courseName.toLowerCase()}`} {...rest}>
      <div className="reserved-group-name">
        <span>{group.name}</span>
      </div>
      {group.slots.map((slot) => (
        <ReservedSlot key={slot.id} reserveSlot={slot} />
      ))}
    </div>
  )
}

function ReservedSlot({ reserveSlot, isLink, ...rest }) {
  const deriveClasses = () => {
    const className = "reserve-slot"
    if (reserveSlot.selected) {
      return className + " reserve-slot__selected"
    }
    return className + ` reserve-slot__${reserveSlot.statusName.toLowerCase()}`
  }

  return (
    <div className={deriveClasses()} {...rest}>
      <span>{reserveSlot.displayText()}</span>
    </div>
  )
}

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

export { ReservedGrid, ReservedList }
