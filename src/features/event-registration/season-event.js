import React from "react"

import { LoadingSpinner } from "components/spinners"
import { useEventRegistration } from "context/registration-context"
import { useMyEvents, usePlayer } from "features/account/account-hooks"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"
import gfm from "remark-gfm"
import * as config from "utils/app-config"

function SeasonEvent(props) {
  const { canStart, onStart } = props
  const myEvents = useMyEvents()
  const player = usePlayer()

  const { clubEvent } = useEventRegistration()

  const loading = clubEvent?.id === undefined
  const hasSignedUp = myEvents.indexOf(config.seasonEventId) >= 0

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Membership Policies</h4>
        <LoadingSpinner loading={loading} />
        {!loading && (
          <React.Fragment>
            <h6 className="card-subtitle">Registration open: {clubEvent.signupWindow}</h6>
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
                        Your current age is <strong>{player.age}</strong>.
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
                  {!hasSignedUp && (
                    <button
                      className="btn btn-primary"
                      style={{ marginRight: "1rem" }}
                      disabled={!canStart}
                      onClick={onStart}
                    >
                      Register Online
                    </button>
                  )}
                  <Link className="btn btn-success" to="/home">
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

export default SeasonEvent
