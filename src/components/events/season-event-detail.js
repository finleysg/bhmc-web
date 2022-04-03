import React from "react"

import { AdminLink } from "components/button/admin-buttons"
import { RegisterButton } from "components/button/register-button"
import { RegisteredButton } from "components/button/registered-button"
import { OverlaySpinner } from "components/spinners"
import { RegistrationSteps } from "context/registration-context"
import { usePlayer, useRegistrationStatus } from "hooks/account-hooks"
import { useSettings } from "hooks/use-settings"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"
import remarkGfm from "remark-gfm"
import * as colors from "styles/colors"

function SeasonEventDetail({ clubEvent, onRegister }) {
  const { currentSeason, seasonEventId, previousSeasonEventId } = useSettings()
  const player = usePlayer()
  const hasSignedUp = useRegistrationStatus(seasonEventId)
  const isReturning = useRegistrationStatus(previousSeasonEventId)

  player.isReturningMember = isReturning
  const loading = clubEvent?.id === undefined

  return (
    <div className="card">
      <AdminLink to={clubEvent?.adminUrl} label="Event administration home" color={colors.teal} />
      <div className="card-body">
        <OverlaySpinner loading={loading} />
        <h3 className="card-title text-primary">{currentSeason} Membership Policies</h3>
        {!loading && (
          <React.Fragment>
            <h6 className="card-subtitle" style={{ marginTop: "1rem" }}>
              Registration open: {clubEvent.signupWindow}
            </h6>
            <div className="card-text">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{clubEvent.notes}</ReactMarkdown>
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
                      {currentSeason} season.
                    </p>
                  </div>
                )}
                {hasSignedUp && (
                  <div className="col-12">
                    <p className="text-primary">
                      It looks like you have already signed up for the {currentSeason} season.
                    </p>
                  </div>
                )}
                {!hasSignedUp && !isReturning && (
                  <div className="col-12">
                    <h6 className="text-danger">
                      As a new member, please indicate your former club (if any) in the notes
                      section when you register.
                    </h6>
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-12">
                  <RegisterButton
                    clubEvent={clubEvent}
                    hasSignedUp={hasSignedUp}
                    currentStep={RegistrationSteps.Pending}
                    style={{ marginRight: ".5rem" }}
                    onClick={onRegister}
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

export default SeasonEventDetail
