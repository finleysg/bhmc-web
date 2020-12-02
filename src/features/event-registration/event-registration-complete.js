import React from "react"

import { RandomGif } from "components/random"
import { useAuth } from "context/auth-context"
import { useEventRegistration } from "context/registration-context"
import { Link } from "react-router-dom"

function EventRegistrationComplete() {
  const { user } = useAuth()
  const { clubEvent } = useEventRegistration()

  return (
    <div className="card-body">
      <h4 className="card-title">{clubEvent?.name}</h4>
      <h6 className="card-subtitle">{clubEvent?.startDate.format("MMMM DD, yyyy")}</h6>
      <div className="row" style={{ marginBottom: "1rem" }}>
        <div className="col-12">
          <h3 className="text-success">You're In!</h3>
          <p>
            A confirmation email will be sent to {user?.email}, as well as a receipt from our
            payment provider.
          </p>
          <RandomGif tag="golf" enabled={true} />
        </div>
      </div>
      <hr />
      <div className="row" style={{ textAlign: "right" }}>
        <div className="col-12">
          <Link to="/home" className="btn btn-light">
            Home
          </Link>
          <Link to="/home" className="btn btn-light" style={{ marginLeft: "1rem" }}>
            Who Else Signed Up?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventRegistrationComplete
