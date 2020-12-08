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
            <ErrorDisplay isError={isError} error={error} />
          </div>
        )}
        {!isLoading && !isError && (
          <div className="login__body">
            <h3>Your Account is Active</h3>
            <p>
              Thank you! Log in now to sign up for an event or update your profile. If you don't
              have a GHIN, you will receive one when you join us for the current golf season.
            </p>
            <Button onClick={handleLogin}>Login</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export { AccountActivateScreen }
