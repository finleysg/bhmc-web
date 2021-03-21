import React from "react"

import { isBefore } from "date-fns"
import { Link } from "react-router-dom"

function RegisteredButton({ clubEvent, ...rest }) {
  const [canView, setCanView] = React.useState(false)

  React.useEffect(() => {
    if (clubEvent?.registrationTypeCode === "N") {
      setCanView(false)
    } else if (isBefore(new Date(), clubEvent.signupStart)) {
      setCanView(false)
    } else {
      setCanView(true)
    }
  }, [clubEvent])

  if (canView) {
    return (
      <Link className="btn btn-info btn-sm" to={clubEvent?.eventUrl + "/registrations"} {...rest}>
        👀 Registered
      </Link>
    )
  }
  return null
}

export { RegisteredButton }
