/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core"

import React from "react"

import { useClubEvent } from "hooks/event-hooks"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"
import gfm from "remark-gfm"
import * as config from "utils/app-config"

function MembershipScreen() {
  const clubEvent = useClubEvent({ eventId: config.seasonEventId })

  return (
    <div className="content__inner">
      <header className="content__title">
        <h1>{config.currentSeason} Season Registration</h1>
      </header>
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Membership Policies</h4>
              <React.Fragment>
                <h6 className="card-subtitle">Registration open: {clubEvent.signupWindow}</h6>
                <div className="card-text">
                  <ReactMarkdown source={clubEvent.notes} plugins={[gfm]} escapeHtml={true} />

                  <div className="col-12">
                    <p className="text-primary">
                      You need to have an account with us and be logged in to register for the{" "}
                      {config.currentSeason} season.
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Link
                      className="btn btn-primary"
                      style={{ marginRight: "1rem" }}
                      to="/session/login"
                    >
                      Login
                    </Link>
                    <Link className="btn btn-light" to="/session/account">
                      Sign Up For an Account
                    </Link>
                  </div>
                </div>
              </React.Fragment>
            </div>
          </div>
        </div>
        <div className="col-lg-6"></div>
      </div>
    </div>
  )
}

export default MembershipScreen
