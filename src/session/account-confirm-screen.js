import "./session.scss"

import React from "react"

import { useAuth } from "context/auth-context"
import { MdAccountCircle } from "react-icons/md"

function AccountConfirmScreen() {
  const { user } = useAuth()

  return (
    <div className="login">
      <div className="login__block active">
        <div className="login__header bg-blue">
          <i>
            <MdAccountCircle />
          </i>
          Confirm Your Email
        </div>

        <div className="login__body">
          <h3>You're Almost Done...</h3>
          <p>
            A verification email was sent to: <strong>{user.email}</strong>.
          </p>
          <p>
            Open this email and click the link to activate your account. If you did not receive this email, please check
            your spam and/or junk email folder. You need to allow emails from postmaster@bhmc.org.
          </p>
        </div>
      </div>
    </div>
  )
}

export { AccountConfirmScreen }
