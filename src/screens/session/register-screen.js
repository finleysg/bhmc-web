import "./session.scss"

import React from "react"

import { useAuth } from "context/auth-context"
import { MdAccountCircle } from "react-icons/md"
import { RegisterForm } from "screens/session/register-form"

function RegisterScreen() {
  const { register } = useAuth()

  return (
    <div className="login">
      <div className="login__block active">
        <div className="login__header bg-blue">
          <i>
            <MdAccountCircle />
          </i>
          Create an Account
        </div>

        <div className="login__body">
          <RegisterForm onSubmit={register} />
        </div>
      </div>
    </div>
  )
}

export { RegisterScreen }
