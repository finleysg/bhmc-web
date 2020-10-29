import "./main-layout.scss"

import React from "react"

import { Route, Routes } from "react-router-dom"
import { SessionScreen } from "screens/session"

function AuthLayout() {
  function SessionRoutes() {
    return (
      <Routes>
        {/* <Route path="/" element={<SessionScreen />} /> */}
        <Route path="/login" element={<SessionScreen />} />
        <Route path="/register" element={<SessionScreen />} />
        <Route path="/forgot-password" element={<SessionScreen />} />
        {/* <Route path="*" element={<NotFoundScreen />} /> */}
      </Routes>
    )
  }

  return (
    <main className="main" data-ma-theme="blue">
      <section className="content">
        <SessionRoutes />
      </section>
    </main>
  )
}

export default AuthLayout
