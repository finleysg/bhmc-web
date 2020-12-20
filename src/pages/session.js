import React from "react"

import { useLocation } from "react-router-dom"

function SessionScreen(props) {
  const location = useLocation()
  return (
    <div style={{ minHeight: "calc(100vh - 216px)" }}>
      <p>Session route {location.pathname}</p>
    </div>
  )
}

export { SessionScreen }
