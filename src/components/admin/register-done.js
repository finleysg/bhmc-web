import React from "react"

import { RegisteredButton } from "components/button/registered-button"
import { useEventAdmin } from "context/admin-context"
import { Link, useNavigate } from "react-router-dom"

function RegisterDone({ selectedStart, title }) {
  const { clubEvent, registration } = useEventAdmin()
  const navigate = useNavigate()

  return (
    <div className="card border border-success">
      <div className="card-header bg-success">
        <span className="registration-title">{title}</span>
      </div>
      <div className="card-body">
        <h4 className="card-title text-success">{selectedStart}</h4>
        <div className="row" style={{ marginBottom: "1rem" }}>
          <div className="col-12">
            <p>Registration saved for {registration.slots[0].playerName}</p>
          </div>
        </div>
        <hr />
        <div className="row" style={{ textAlign: "right" }}>
          <div className="col-12">
            <RegisteredButton clubEvent={clubEvent} style={{ marginRight: ".5rem" }} />
            <Link to="/home" className="btn btn-light" style={{ marginRight: ".5rem" }}>
              Home
            </Link>
            <button className="btn btn-light" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterDone
