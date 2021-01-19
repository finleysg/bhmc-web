import React from "react"

import { useAuth } from "context/auth-context"
import { format, isAfter, isBefore } from "date-fns"
import { useEventDocuments } from "hooks/document-hooks"
import { FiFileText } from "react-icons/fi"
import { Link } from "react-router-dom"
import * as colors from "styles/colors"

function EventDocuments({ clubEvent }) {
  const documents = useEventDocuments(clubEvent?.id)

  if (documents && documents.length > 0) {
    return documents.map((doc) => {
      return <DocumentButton key={doc.id} document={doc} />
    })
  }
  return null
}

function DocumentButton({ document }) {
  return (
    <div style={{ textAlign: "center", margin: "0 1rem" }}>
      <a
        href={document.file}
        alt={document.title}
        style={{ color: colors.teal }}
        target="_blank"
        rel="noreferrer"
      >
        <FiFileText style={{ fontSize: "3rem" }} />
        <p style={{ fontSize: ".8rem" }}>{document.title}</p>
      </a>
    </div>
  )
}

function SimpleRegistrationList({ registrations, sortBy }) {
  const { user } = useAuth()

  const getPlayers = React.useCallback(() => {
    // TODO: don't do this - map to ReserveSlot
    const registered = []
    registrations.forEach((r) => {
      r.slots.forEach((s) => {
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
        return (
          <RegistrationSlotView key={p.id} playerRegistration={p} isLink={user?.is_authenticated} />
        )
      })}
    </div>
  )
}

function RegistrationSlotView({ playerRegistration, isLink, ...rest }) {
  // TODO: render reserve slot
  const slot = () => {
    return (
      <div
        style={{
          border: `1px solid ${colors.gray300}`,
          borderRadius: "5px",
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

export { DocumentButton, EventDocuments, RegistrationSlotView, SimpleRegistrationList }
