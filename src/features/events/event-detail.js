import { useRegistrationStatus } from "hooks/account-hooks"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"
import gfm from "remark-gfm"
import { dayAndDateFormat, dayDateAndTimeFormat } from "utils/event-utils"

function EventDetail({ clubEvent }) {
  const hasSignedUp = useRegistrationStatus(clubEvent.id)

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
            <button style={{ marginLeft: "1rem" }} className="btn btn-sm btn-info">
              Tee Times
            </button>
          </div>
          <div>
            <button style={{ marginLeft: "1rem" }} className="btn btn-sm btn-info">
              Results
            </button>
          </div>
          <div>
            <button style={{ marginLeft: "1rem" }} className="btn btn-sm btn-info">
              Portal
            </button>
          </div>
          <div>
            <Link
              style={{ marginLeft: "1rem" }}
              to={clubEvent.eventUrl + "/registrations"}
              className="btn btn-sm btn-info"
            >
              Registered
            </Link>
          </div>
          <div>
            <button style={{ marginLeft: "1rem" }} className="btn btn-sm btn-warning">
              Register Now
            </button>
          </div>
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
