import "../event-registration/register.scss"
import "../reserve/reserve.scss"

import React from "react"

import { OverlaySpinner } from "components/spinners"
import { useEventAdmin } from "context/admin-context"

import RegisterInfo from "./register-info"

function EditRegistration({ clubEvent, registrationId }) {
  const { registration, loadRegistration, updateRegistration } = useEventAdmin()

  React.useEffect(() => {
    if (!registration) {
      loadRegistration(registrationId)
    }
  }, [registration, registrationId, loadRegistration])

  const layout =
    clubEvent.maximumSignupGroupSize === 1
      ? "vertical"
      : clubEvent.fees.length > 5
      ? "vertical"
      : "horizontal"

  const handleUpdate = () => {
    updateRegistration()
    // nav back
  }

  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <OverlaySpinner loading={!registration} />
        <div>
          {registration && (
            <RegisterInfo
              layout={layout}
              title="Edit Registration"
              selectedStart={null}
              onCancel={null}
              onComplete={handleUpdate}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export { EditRegistration }
