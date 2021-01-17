import React from "react"

import { EventPortalButton } from "components/button/portal-button"
import { RegisterButton } from "components/button/register-button"
import { RegisteredButton } from "components/button/registered-button"
import { LoadingSpinner } from "components/spinners"
import { useEventRegistration } from "context/registration-context"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"

function MatchPlayEvent() {
  const { clubEvent, currentStep, startRegistration } = useEventRegistration()

  const loading = clubEvent?.id === undefined

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">Match Play Rules and Information</h4>
        <LoadingSpinner loading={loading} />
        {!loading && (
          <React.Fragment>
            <h6 className="card-subtitle" style={{ marginTop: "1rem" }}>
              Registration open: {clubEvent.signupWindow}
            </h6>
            <div className="card-text">
              <ReactMarkdown source={clubEvent.notes} plugins={[gfm]} escapeHtml={true} />
              <div className="row">
                <div className="col-12">
                  <RegisterButton
                    clubEvent={clubEvent}
                    currentStep={currentStep}
                    style={{ marginRight: ".5rem" }}
                    onClick={startRegistration}
                  />
                  <RegisteredButton clubEvent={clubEvent} style={{ marginRight: ".5rem" }} />
                  <EventPortalButton clubEvent={clubEvent} style={{ marginRight: ".5rem" }} />
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
