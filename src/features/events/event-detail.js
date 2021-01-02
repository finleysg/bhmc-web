import {
  EventDocuments,
  EventPortalButton,
  RegisterButton,
  RegisteredButton,
} from "components/registration"
import { RegistrationSteps } from "context/registration-context"
import { useRegistrationStatus } from "hooks/account-hooks"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import { dayAndDateFormat, dayDateAndTimeFormat } from "utils/event-utils"

function EventDetail({ clubEvent }) {
  const hasSignedUp = useRegistrationStatus(clubEvent.id)

  const handleRegister = () => {
    // no-op for now
  }

  return (
    <div className="card">
      <div className="card-body">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "right",
            marginBottom: "1.5rem",
            borderBottom: "2px solid #e9ecef",
          }}
        >
          <div style={{ flex: "1 0 35%", justifySelf: "left" }}>
            <h3 className="text-primary">{clubEvent.name}</h3>
          </div>
          <div>
            <EventPortalButton style={{ marginLeft: ".5rem" }} clubEvent={clubEvent} />
          </div>
          <div>
            <RegisteredButton style={{ marginLeft: ".5rem" }} clubEvent={clubEvent} />
          </div>
          <div>
            <RegisterButton
              style={{ marginLeft: ".5rem" }}
              clubEvent={clubEvent}
              currentStep={RegistrationSteps.Pending}
              onClick={handleRegister}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <EventDocuments clubEvent={clubEvent} />
        </div>
        <div className="card-text">
          <p style={{ marginBottom: ".5rem" }}>
            <strong>Event date:</strong> {dayAndDateFormat(clubEvent.startDate)}
          </p>
          <p>
            <strong>Start:</strong> {clubEvent.startTime} {clubEvent.startType}
          </p>
          <p style={{ marginBottom: ".5rem" }}>
            <strong>Registration opens: </strong> {dayDateAndTimeFormat(clubEvent.signupStart)}
          </p>
          <p style={{ marginBottom: ".5rem" }}>
            <strong>Registration closes: </strong> {dayDateAndTimeFormat(clubEvent.signupEnd)}
          </p>
          <p style={{ marginBottom: ".5rem" }}>
            <strong>Registration type: </strong> {clubEvent.registrationType}
          </p>
          {hasSignedUp && (
            <p className="text-danger">
              <strong>You are registered for this event.</strong>
            </p>
          )}
          <h5 className="text-success" style={{ marginTop: "2rem" }}>
            Format and Notes
          </h5>
          <ReactMarkdown source={clubEvent.notes} plugins={[gfm]} escapeHtml={true} />
        </div>
      </div>
    </div>
  )
}

export default EventDetail
