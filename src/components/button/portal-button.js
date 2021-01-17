import React from "react"

function EventPortalButton({ clubEvent, ...rest }) {
  if (Boolean(clubEvent?.portalUrl)) {
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

export { EventPortalButton }
