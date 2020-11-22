import "./session.scss"

import React from "react"

import { useAuth } from "context/auth-context"
import { LoginForm } from "features/session/login-form"
import { MdAccountCircle } from "react-icons/md"

function LoginScreen() {
  const { login } = useAuth()

  return (
    <div className="login">
      <div className="login__block active">
        <div className="login__header bg-green">
          <i>
            <MdAccountCircle />
          </i>
          Sign In to Your Account
        </div>

        <div className="login__body">
          <LoginForm onSubmit={login} />
        </div>
      </div>
    </div>
  )
}

export { LoginScreen }
