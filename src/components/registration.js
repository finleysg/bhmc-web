import React from "react"

import { RegistrationSteps } from "context/registration-context"
import { format, isAfter, isBefore } from "date-fns"
import { useRegistrationStatus } from "hooks/account-hooks"
import { useEventDocuments } from "hooks/document-hooks"
import { usePlayers } from "hooks/player-hooks"
import { FiFileText } from "react-icons/fi"
import { Link } from "react-router-dom"
import * as colors from "styles/colors"
import * as config from "utils/app-config"

function MemberOnlyRegisterButton({ clubEvent, currentStep, onClick, ...rest }) {
  const isMember = useRegistrationStatus(config.seasonEventId)
  if (isMember) {
    return (
      <RegisterButton clubEvent={clubEvent} currentStep={currentStep} onClick={onClick} {...rest} />
    )
  }
  return null
}

function RegisterButton({ clubEvent, currentStep, onClick, ...rest }) {
  const hasSignedUp = useRegistrationStatus(clubEvent?.id)

  if (clubEvent?.registrationIsOpen && !hasSignedUp) {
    return (
      <button
        className="btn btn-warning btn-sm"
        disabled={currentStep !== RegistrationSteps.Pending}
        onClick={onClick}
        {...rest}
      >
        🖊️ Sign Up Now
      </button>
    )
  }
  return null
}

function RegisteredButton({ clubEvent, ...rest }) {
  return (
    <Link className="btn btn-info btn-sm" to={clubEvent?.eventUrl + "/registrations"} {...rest}>
      👀 Registered
    </Link>
  )
}

function EventPortalButton({ clubEvent, ...rest }) {
  if (clubEvent?.portalUrl) {
    return (
      <a
        className="btn btn-info btn-sm"
        href={clubEvent.portalUrl}
        target="_blank"
        rel="noreferrer"
        {...rest}
      >
        🌐 Event Portal
      </a>
    )
  }
  return null
}

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

function DocumentCard({ document, ...rest }) {
  const cardColor = (documentType) => {
    switch (documentType) {
      case "R":
        return "text-indigo"
      case "T":
        return "text-teal"
      case "F":
        return "text-green"
      case "P":
      case "D":
        return "text-light-blue"
      default:
        return "text-blue-gray"
    }
  }

  return (
    <a href={document.file} target="_blank" rel="noreferrer" alt={document.title}>
      <div
        style={{
          border: `1px solid ${colors.gray300}`,
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          margin: "1rem",
          minWidth: "300px",
          maxWidth: "420px",
        }}
        {...rest}
      >
        <div className={cardColor(document.documentType)} style={{ marginRight: "1rem" }}>
          <FiFileText style={{ fontSize: "3rem" }} />
        </div>
        <div>
          <p
            className={cardColor(document.documentType)}
            style={{ marginBottom: ".3rem", fontWeight: "bold" }}
          >
            {document.title}
          </p>
          <p style={{ marginBottom: 0 }}>
            <small className="text-muted">
              Updated: {format(document.lastUpdate, "MMMM d, yyyy h:mm aaaa")}
            </small>
          </p>
        </div>
      </div>
    </a>
  )
}

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

export {
  DocumentButton,
  DocumentCard,
  EventDocuments,
  EventPortalButton,
  MemberOnlyRegisterButton,
  RegisterButton,
  RegisteredButton,
  RegistrationSlotView,
  SimpleRegistrationList,
}
