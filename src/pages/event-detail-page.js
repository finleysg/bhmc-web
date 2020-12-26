import { useClubEvent } from "hooks/event-hooks"
import ReactMarkdown from "react-markdown"
import { useParams } from "react-router-dom"
import gfm from "remark-gfm"
import { dayAndDateFormat, dayDateAndTimeFormat } from "utils/event-utils"

function EventDetailPage() {
  const { eventDate, eventName } = useParams()
  const clubEvent = useClubEvent({ eventDate, eventName })

  return (
    <div className="content__inner">
      <header className="content__title">
        <h1>Event Detail</h1>
      </header>
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-primary">Event: {clubEvent.name}</h4>
              <div className="card-text">
                <p style={{ marginBottom: ".5rem" }}>
                  <strong>Event date:</strong> {dayAndDateFormat(clubEvent.startDate)}
                </p>
                <p>
                  <strong>Start:</strong> {clubEvent.startTime} {clubEvent.startType}
                </p>
                <p style={{ marginBottom: ".5rem" }}>
                  <strong>Registration opens: </strong>{" "}
                  {dayDateAndTimeFormat(clubEvent.signupStart)}
                </p>
                <p style={{ marginBottom: ".5rem" }}>
                  <strong>Registration closes: </strong> {dayDateAndTimeFormat(clubEvent.signupEnd)}
                </p>
                <p style={{ marginBottom: ".5rem" }}>
                  <strong>Registration type: </strong> {clubEvent.registrationType}
                </p>
                {/* <p className="text-danger">
                  <strong>You are registered for this event.</strong>
                </p> */}
                <h5 className="text-success" style={{ marginTop: "2rem" }}>
                  Format and Notes
                </h5>
                <ReactMarkdown source={clubEvent.notes} plugins={[gfm]} escapeHtml={true} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-success">Fees and Points</h5>
              <div className="card-text">
                {clubEvent.fees.map((eventFee) => {
                  return (
                    <p key={eventFee.id} style={{ marginBottom: ".5rem" }}>
                      <strong>{eventFee.name}:</strong> ${eventFee.amount.toFixed(2)}
                    </p>
                  )
                })}
                <p style={{ marginTop: "1rem" }}>
                  <strong>Group size:</strong> {clubEvent.groupSize ?? "N/A"}
                </p>
                <p>
                  <strong>Season long points:</strong> {clubEvent.seasonPoints ?? 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailPage
