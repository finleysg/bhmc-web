import React from "react"

import { useLocation } from "react-router-dom"

function TestingScreen(props) {
  const location = useLocation()
  return (
    <div style={{ padding: "30px 15px", minHeight: "calc(100vh - 136px)" }}>
      <p>You have landed on {location.pathname}</p>
    </div>
  )
}

export { TestingScreen }
