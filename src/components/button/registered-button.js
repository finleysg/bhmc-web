import React from "react"

import { Link } from "react-router-dom"

function RegisteredButton({ clubEvent, ...rest }) {
  return (
    <Link className="btn btn-info btn-sm" to={clubEvent?.eventUrl + "/registrations"} {...rest}>
      👀 Registered
    </Link>
  )
}

export { RegisteredButton }
