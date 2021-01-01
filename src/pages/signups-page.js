import { SimpleRegistrationList } from "components/registration"
import { useEventWithRegistrations } from "hooks/event-hooks"
import { useParams } from "react-router-dom"

function SignupsPage() {
  const params = useParams()
  const { clubEvent, registrations } = useEventWithRegistrations(params)

  return (
    <div className="content__inner">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-primary">{clubEvent.name}</h3>
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
