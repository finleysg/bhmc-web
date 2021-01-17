import "./session.scss"

import React from "react"

import { useAuth } from "context/auth-context"
import { MdAccountCircle } from "react-icons/md"
import { RegisterForm } from "session/register-form"
import { RoutingMenu } from "session/routing-menu"

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
          <RoutingMenu
            links={[
              { to: "/session/login", name: "Login" },
              { to: "/session/reset-password", name: "Reset My Password" },
              { to: "/home", name: "Home" },
            ]}
          />
        </div>

        <div className="login__body">
          <RegisterForm onSubmit={register} />
        </div>
      </div>
    </div>
  )
}

export { RegisterScreen }
