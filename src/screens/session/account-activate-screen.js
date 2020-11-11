import "./session.scss"

import React from "react"

import { Button } from "components/buttons"
import { ErrorDisplay } from "components/errors"
import { Spinner } from "components/spinners"
import { useAuth } from "context/auth-context"
import { MdAccountCircle } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import { useAsync } from "utils/use-async"

function AccountActivateScreen() {
  const { uid, token } = useParams()
  const { isError, isLoading, error, run } = useAsync()
  const { activate } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    run(activate({ uid, token })).catch(() => {})
  }, [uid, token, run, activate])

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
          Account Activation
        </div>
        {isLoading && (
          <div className="login__body">
            <h3 className="text-green">
              <i title="loading">
                <Spinner style={{ marginTop: ".6rem" }} />
              </i>
            </h3>
            <p>Activating your account...</p>
          </div>
        )}
        {!isLoading && isError && (
          <div className="login__body">
            <h3>Activation Failed</h3>
            <ErrorDisplay error={error} />
          </div>
        )}
        {!isLoading && !isError && (
          <div className="login__body">
            <h3>Your Account is Active</h3>
            <p>Log in now to register for the 2021 club season, or register for an open event.</p>
            <Button onClick={handleLogin}>Login</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export { AccountActivateScreen }
