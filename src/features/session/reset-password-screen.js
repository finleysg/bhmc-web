import "./session.scss"

import React from "react"

import { useAuth } from "context/auth-context"
import { MdAccountCircle } from "react-icons/md"

import { ResetPasswordForm } from "./reset-password-form"

function ResetPasswordScreen() {
  const { requestPasswordReset } = useAuth()

  return (
    <div className="login">
      <div className="login__block active">
        <div className="login__header bg-blue">
          <i>
            <MdAccountCircle />
          </i>
          Reset My Password
        </div>

        <div className="login__body">
          <p>
            Enter your email below. If you have an account with us with that email address, we will email you a link you
            can use to create a new password.
          </p>
          <ResetPasswordForm onSubmit={requestPasswordReset} />
        </div>
      </div>
    </div>
  )
}

export { ResetPasswordScreen }
