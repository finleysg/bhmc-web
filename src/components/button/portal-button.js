import React from "react"

import * as colors from "styles/colors"

function EventPortalButton({ clubEvent, ...rest }) {
  if (Boolean(clubEvent?.portalUrl)) {
    return (
      <a
        className="btn btn-info btn-sm"
        style={{ color: colors.white }}
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
