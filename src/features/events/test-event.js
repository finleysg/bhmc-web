import React from "react"

import { LoadingSpinner } from "components/spinners"
import { RegistrationSteps, useEventRegistration } from "context/registration-context"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"

function TestEvent() {
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
                  <button
                    className="btn btn-primary"
                    style={{ marginRight: ".5rem" }}
                    disabled={currentStep !== RegistrationSteps.Pending}
                    onClick={startRegistration}
                  >
                    Register Online
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default TestEvent
