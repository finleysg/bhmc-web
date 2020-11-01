import "./auth-layout.scss"

import React from "react"

import { AuthHeader } from "navigation/header"
import { Route, Routes } from "react-router-dom"
import { LoginScreen } from "screens/login"
import { SessionScreen } from "screens/session"

function AuthLayout() {
  function SessionRoutes() {
    return (
      <Routes>
        {/* <Route path="/" element={<SessionScreen />} /> */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<SessionScreen />} />
        <Route path="/forgot-password" element={<SessionScreen />} />
        {/* <Route path="*" element={<NotFoundScreen />} /> */}
      </Routes>
    )
  }

  return (
    <div className="session">
      <AuthHeader />
      <div>
        <SessionRoutes />
      </div>
      {/* <Footer transparent /> */}
    </div>
  )
}

export default AuthLayout
