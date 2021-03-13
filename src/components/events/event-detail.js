import "./events.scss"

import React from "react"

import { AdminLink } from "components/button/admin-buttons"
import { EditRegistrationButton } from "components/button/edit-registration-button"
import { EventPortalButton } from "components/button/portal-button"
import { RegisterButton } from "components/button/register-button"
import { RegisteredButton } from "components/button/registered-button"
import { OverlaySpinner } from "components/spinners"
import { RegistrationSteps } from "context/registration-context"
import { useRegistrationStatus } from "hooks/account-hooks"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import {
  dayAndDateFormat,
  dayDateAndTimeFormat,
} from "utils/event-utils"

function EventActionButtons({ clubEvent, onRegister, onEditRegistration }) {
  return (
    <div className="event-header">
      <div className="event-header--title">
        <h3 className="text-primary">{clubEvent.name}</h3>
      </div>
      <div className="event-header--actions">
        <EventPortalButton clubEvent={clubEvent} />
        <RegisteredButton clubEvent={clubEvent} />
        <EditRegistrationButton
          clubEvent={clubEvent}
          currentStep={RegistrationSteps.Pending}
          onClick={onEditRegistration}
        />
        <RegisterButton
          clubEvent={clubEvent}
          currentStep={RegistrationSteps.Pending}
          onClick={onRegister}
        />
      </div>
    </div>
  )
}

function EventDetail({ clubEvent, onRegister, onEditRegistration }) {
  const hasSignedUp = useRegistrationStatus(clubEvent.id)

  return (
    <div className="card">
      <AdminLink to={clubEvent?.adminUrl} label="Event administration home" />
      <div className="card-body">
        <OverlaySpinner loading={!clubEvent?.id} />
        <EventActionButtons
          clubEvent={clubEvent}
          onRegister={onRegister}
          onEditRegistration={onEditRegistration}
        />
        <div className="card-text">
          <div className="registration-start-item">
            <div className="label">Event date:</div>
            <div className="value">{dayAndDateFormat(clubEvent.startDate)}</div>
          </div>
          <div className="registration-start-item">
            <div className="label">Start:</div>
            <div className="value">
              {clubEvent.startTime}{" "}
              {clubEvent.startType === "Not Applicable" ? "" : clubEvent.startType}
            </div>
          </div>
          {clubEvent.registrationType !== "None" && (
            <React.Fragment>
              <div className="registration-start-item">
                <div className="label">Registration opens:</div>
                <div className="value">{dayDateAndTimeFormat(clubEvent.signupStart)}</div>
              </div>
              <div className="registration-start-item">
                <div className="label">Registration closes:</div>
                <div className="value">{dayDateAndTimeFormat(clubEvent.signupEnd)}</div>
              </div>
            </React.Fragment>
          )}
          <div className="registration-start-item">
            <div className="label">Registration type:</div>
            <div className="value">{clubEvent.registrationType}</div>
          </div>
          {hasSignedUp && (
            <p className="text-danger">
              <strong>You are registered for this event.</strong>
            </p>
          )}
          <h5 className="text-success" style={{ marginTop: "2rem" }}>
            Notes
          </h5>
          <ReactMarkdown source={clubEvent.notes} plugins={[gfm]} escapeHtml={true} />
        </div>
      </div>
    </div>
  )
}

export default EventDetail
