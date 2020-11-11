import "./auth-layout.scss"

import React from "react"

import { Route, Routes } from "react-router-dom"
import { NotFoundScreen } from "screens/not-found"
import {
  AccountActivateScreen,
  AccountConfirmScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordCompleteScreen,
  ResetPasswordConfirmScreen,
  ResetPasswordScreen,
  ResetPasswordSentScreen,
} from "screens/session/index"

import { AuthHeader } from "./auth-header"

function SessionRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/account" element={<RegisterScreen />} />
      <Route path="/account/confirm" element={<AccountConfirmScreen />} />
      <Route path="/account/activate/:uid/:token" element={<AccountActivateScreen />} />
      <Route path="/reset-password" element={<ResetPasswordScreen />} />
      <Route path="/reset-password/sent" element={<ResetPasswordSentScreen />} />
      <Route path="/reset-password/:uid/:token" element={<ResetPasswordConfirmScreen />} />
      <Route path="/reset-password/complete" element={<ResetPasswordCompleteScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

function AuthLayout() {
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
