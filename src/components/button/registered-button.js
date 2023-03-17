import { isBefore } from "date-fns"
import { Link } from "react-router-dom"
import * as colors from "styles/colors"

function RegisteredButton({ clubEvent, ...rest }) {
  const canView =
    clubEvent?.registrationTypeCode !== "N" && !isBefore(new Date(), clubEvent.signupStart)

  if (canView) {
    return (
      <Link
        className="btn btn-info btn-sm"
        style={{ color: colors.white }}
        to={clubEvent?.eventUrl + "/registrations"}
        {...rest}
      >
        👀 Registered
      </Link>
    )
  }
  return null
}

export { RegisteredButton }
