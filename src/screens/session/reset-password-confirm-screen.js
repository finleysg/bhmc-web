import "./session.scss"

import React from "react"

import { useAuth } from "context/auth-context"
import { MdAccountCircle } from "react-icons/md"

import { ResetPasswordConfirmForm } from "./reset-password-confirm-form"

function ResetPasswordConfirmScreen() {
  const { resetPassword } = useAuth()

  return (
    <div className="login">
      <div className="login__block active">
        <div className="login__header bg-green">
          <i>
            <MdAccountCircle />
          </i>
          Create a New Password
        </div>

        <div className="login__body">
          <ResetPasswordConfirmForm onSubmit={resetPassword} />
        </div>
      </div>
    </div>
  )
}

export { ResetPasswordConfirmScreen }
