import React from "react"

import { LoadingSpinner } from "components/spinners"
import { RegistrationSteps, useEventRegistration } from "context/registration-context"
import { useMyEvents } from "hooks/account-hooks"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"
import gfm from "remark-gfm"
import * as config from "utils/app-config"

function MatchPlayEvent() {
  const myEvents = useMyEvents()

  const { clubEvent, currentStep, startRegistration } = useEventRegistration()

  const loading = clubEvent?.id === undefined
  const hasSignedUp = myEvents?.indexOf(config.seasonMatchPlayId) >= 0

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Match Play Rules and Information</h4>
        <LoadingSpinner loading={loading} />
        {!loading && (
          <React.Fragment>
            <h6 className="card-subtitle">Registration open: {clubEvent.signupWindow}</h6>
            <div className="card-text">
              <ReactMarkdown source={clubEvent.notes} plugins={[gfm]} escapeHtml={true} />
              <div className="row">
                <div className="col-12">
                  {!hasSignedUp && (
                    <button
                      className="btn btn-primary"
                      style={{ marginRight: ".5rem" }}
                      disabled={currentStep !== RegistrationSteps.Pending}
                      onClick={startRegistration}
                    >
                      Register Online
                    </button>
                  )}
                  <Link
                    className="btn btn-success"
                    style={{ marginRight: ".5rem" }}
                    disabled={currentStep !== RegistrationSteps.Pending}
                    to="/home"
                  >
                    Match Play Portal
                  </Link>
                  <Link
                    className="btn btn-light"
                    disabled={currentStep !== RegistrationSteps.Pending}
                    to="/home"
                  >
                    See Who Signed Up
                  </Link>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default MatchPlayEvent
