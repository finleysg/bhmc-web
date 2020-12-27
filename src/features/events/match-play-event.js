import React from "react"

import { LoadingSpinner } from "components/spinners"
import { RegistrationSteps, useEventRegistration } from "context/registration-context"
import { useRegistrationStatus } from "hooks/account-hooks"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"
import gfm from "remark-gfm"
import * as config from "utils/app-config"

function MatchPlayEvent() {
  const isMember = useRegistrationStatus(config.seasonEventId)
  const hasSignedUp = useRegistrationStatus(config.seasonMatchPlayId)
  const { clubEvent, currentStep, startRegistration } = useEventRegistration()

  const loading = clubEvent?.id === undefined

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
                  {isMember && !hasSignedUp && (
                    <button
                      className="btn btn-primary"
                      style={{ marginRight: ".5rem" }}
                      disabled={currentStep !== RegistrationSteps.Pending}
                      onClick={startRegistration}
                    >
                      Register Online
                    </button>
                  )}
                  {clubEvent.portalUrl && (
                    <a
                      className="btn btn-success"
                      style={{ marginRight: ".5rem" }}
                      disabled={currentStep !== RegistrationSteps.Pending}
                      href={clubEvent.portalUrl}
                    >
                      Match Play Portal
                    </a>
                  )}
                  {isMember && (
                    <Link
                      className="btn btn-success"
                      disabled={currentStep !== RegistrationSteps.Pending}
                      to={clubEvent.eventUrl + "/registrations"}
                    >
                      See Who Signed Up
                    </Link>
                  )}
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
