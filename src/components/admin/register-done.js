import React from "react"

import { RegisteredButton } from "components/button/registered-button"
import { useEventAdmin } from "context/admin-context"
import { Link } from "react-router-dom"

function RegisterDone({ selectedStart, title }) {
  const { clubEvent, registration } = useEventAdmin()

  return (
    <div className="card border border-success">
      <div className="card-header bg-success">
        <span className="registration-title">{title}</span>
      </div>
      <div className="card-body">
        <h4 className="card-title text-success">{selectedStart}</h4>
        <div className="row" style={{ marginBottom: "1rem" }}>
          <div className="col-12">
            <p>Registration complete for {registration.slots[0].playerName}</p>
          </div>
        </div>
        <hr />
        <div className="row" style={{ textAlign: "right" }}>
          <div className="col-12">
            <RegisteredButton clubEvent={clubEvent} style={{ marginRight: ".5rem" }} />
            <Link
              to={`/admin/event/${clubEvent.id}`}
              className="btn btn-light"
              style={{ marginRight: ".5rem" }}
            >
              Admin Home
            </Link>
            <Link to="/home" className="btn btn-light">
              Home
            </Link>
            {/* <button className="btn btn-light" onClick={() => resetRegistration()}>
              Add Another
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterDone
