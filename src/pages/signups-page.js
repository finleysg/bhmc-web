import { SimpleRegistrationList } from "components/registration"
import { useEventWithRegistrations } from "hooks/event-hooks"
import { useParams } from "react-router-dom"

function SignupsPage() {
  const params = useParams()
  const { clubEvent, registrations } = useEventWithRegistrations(params)

  return (
    <div className="content__inner">
      <header className="content__title">
        <h1>Event Sign Ups</h1>
      </header>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{clubEvent.name}</h4>
          <div className="card-text">
            <div className="row">
              <SimpleRegistrationList registrations={registrations} sortBy="player" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupsPage
