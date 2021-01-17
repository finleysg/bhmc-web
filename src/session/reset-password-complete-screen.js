import "./session.scss"

import React from "react"

import { Button } from "components/button/buttons"
import { MdAccountCircle } from "react-icons/md"
import { useNavigate } from "react-router-dom"

function ResetPasswordCompleteScreen() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/session/login")
  }

  return (
    <div className="login">
      <div className="login__block active">
        <div className="login__header bg-green">
          <i>
            <MdAccountCircle />
          </i>
          Password Reset Complete
        </div>
        <div className="login__body">
          <p>Your password has been updated.</p>
          <Button onClick={handleLogin}>Login</Button>
        </div>
      </div>
    </div>
  )
}

export { ResetPasswordCompleteScreen }
