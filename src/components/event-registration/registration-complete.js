import React from "react"

import { RegisteredButton } from "components/button/registered-button"
import { RandomGif } from "components/random-gif"
import { useAuth } from "context/auth-context"
import { useEventRegistration } from "context/registration-context"
import { Link } from "react-router-dom"

function RegistrationComplete({ selectedStart, title }) {
  const { user } = useAuth()
  const { clubEvent } = useEventRegistration()

  return (
    <div className="card border border-success">
      <div className="card-header bg-success">
        <span className="registration-title">{title}</span>
      </div>
      <div className="card-body">
        <h4 className="card-title text-success">{selectedStart}</h4>
        <div className="row" style={{ marginBottom: "1rem" }}>
          <div className="col-12">
            <h3 className="text-success">You're In!</h3>
            <p>
              A confirmation email will be sent to {user?.email}, as well as a receipt from our
              payment provider.
            </p>
            <RandomGif enabled={true} />
          </div>
        </div>
        <hr />
        <div className="row" style={{ textAlign: "right" }}>
          <div className="col-12">
            <RegisteredButton clubEvent={clubEvent} style={{ marginRight: ".5rem" }} />
            <Link to="/home" className="btn btn-light">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationComplete
