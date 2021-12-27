import React from "react"

import { CreateAccountButton } from "components/button/create-account-button"
import { LoginButton } from "components/button/login-button"
import { RegisteredButton } from "components/button/registered-button"
import { useClubEvents } from "hooks/event-hooks"
import { useSettings } from "hooks/use-settings"
import { loadingEvent } from "models/club-event"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import { getClubEvent } from "utils/event-utils"

function MembershipScreen() {
  const { currentSeason, seasonEventId } = useSettings()
  const [clubEvent, setClubEvent] = React.useState(loadingEvent)
  const clubEvents = useClubEvents(currentSeason)

  React.useEffect(() => {
    if (clubEvents && clubEvents.length > 0) {
      const evt = getClubEvent({ events: clubEvents, eventId: seasonEventId })
      setClubEvent(evt)
    }
  }, [clubEvents, setClubEvent])

  return (
    <div className="content__inner">
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-success">Membership Policies</h3>
              <React.Fragment>
                <h6 className="card-subtitle" style={{ marginTop: "1rem" }}>
                  Registration open: {clubEvent.signupWindow}
                </h6>
                <div className="card-text">
                  <ReactMarkdown plugins={[gfm]} escapeHtml={true}>
                    {clubEvent.notes}
                  </ReactMarkdown>
                  <div className="col-12">
                    <p className="text-primary">
                      You need to have an account with us and be logged in to register for the{" "}
                      {currentSeason} season.
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <RegisteredButton clubEvent={clubEvent} style={{ marginRight: ".5rem" }} />
                    <LoginButton style={{ marginRight: ".5rem" }} />
                    <CreateAccountButton />
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
