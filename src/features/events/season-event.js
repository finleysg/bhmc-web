import React from "react"

import { RegisterButton, RegisteredButton } from "components/registration"
import { LoadingSpinner } from "components/spinners"
import { useEventRegistration } from "context/registration-context"
import { usePlayer, useRegistrationStatus } from "hooks/account-hooks"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"
import gfm from "remark-gfm"
import * as config from "utils/app-config"

function SeasonEvent() {
  const player = usePlayer()
  const hasSignedUp = useRegistrationStatus(config.seasonEventId)
  const { clubEvent, currentStep, startRegistration } = useEventRegistration()

  const loading = clubEvent?.id === undefined

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title text-primary">{config.currentSeason} Membership Policies</h3>
        <LoadingSpinner loading={loading} />
        {!loading && (
          <React.Fragment>
            <h6 className="card-subtitle" style={{ marginTop: "1rem" }}>
              Registration open: {clubEvent.signupWindow}
            </h6>
            <div className="card-text">
              <ReactMarkdown source={clubEvent.notes} plugins={[gfm]} escapeHtml={true} />
              <div className="row">
                {!hasSignedUp && (
                  <div className="col-12">
                    <ul data-testid="player-info" className="text-primary">
                      <li>
                        Your current selection for competition tees is <strong>{player.tee}</strong>
                        .
                      </li>
                      <li>
                        {isNaN(player.age) ? (
                          <span>
                            You have not given us your birth date. We cannot give you the senior
                            rate for the patron card.
                          </span>
                        ) : (
                          <span>
                            Your current age is <strong>{player.age}</strong>.
                          </span>
                        )}
                      </li>
                      <li>
                        {player.ghin ? (
                          <span>
                            Your ghin is <strong>{player.ghin}</strong>.
                          </span>
                        ) : (
                          <span>
                            <strong>You do not have a ghin.</strong>
                          </span>
                        )}
                      </li>
                    </ul>
                    <p>
                      If this information is not correct, please update your profile at the{" "}
                      <Link to="/my-account">My Account</Link> page before you register for the{" "}
                      {config.currentSeason} season.
                    </p>
                  </div>
                )}
                {hasSignedUp && (
                  <div className="col-12">
                    <p className="text-primary">
                      It looks like you have already signed up for the {config.currentSeason}{" "}
                      season.
                    </p>
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-12">
                  <RegisterButton
                    clubEvent={clubEvent}
                    currentStep={currentStep}
                    style={{ marginRight: ".5rem" }}
                    onClick={startRegistration}
                  />
                  <RegisteredButton clubEvent={clubEvent} style={{ marginRight: ".5rem" }} />
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default SeasonEvent
