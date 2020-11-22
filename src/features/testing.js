import React from "react"

import { useLocation } from "react-router-dom"

function TestingScreen(props) {
  const location = useLocation()
  return (
    <div style={{ minHeight: "calc(100vh - 216px)" }}>
      <p>You have landed on {location.pathname}</p>
    </div>
  )
}

export { TestingScreen }
