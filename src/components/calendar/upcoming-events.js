import { AdminLink } from "components/button/admin-buttons"
import {
  addDays,
  isWithinInterval,
  subDays,
} from "date-fns"
import { useClubEvents } from "hooks/event-hooks"
import { Link } from "react-router-dom"
import * as colors from "styles/colors"
import { dayAndDateFormat } from "utils/event-utils"

function UpcomingEvent({ event }) {
  return (
    <Link className="listview__item" to={event.eventUrl}>
      <i className={`avatar-char ${event.eventTypeClass}`}>{event.name[0]}</i>
      <div className="listview__content">
        <div className="listview__heading">{event.name}</div>
        <p>{dayAndDateFormat(event.startDate)}</p>
      </div>
    </Link>
  )
}

function UpcomingEvents() {
  const events = useClubEvents()

  const upcoming = () => {
    if (events && events.length > 0) {
      const threeDaysAgo = subDays(new Date(), 3)
      const twoWeeksFromNow = addDays(new Date(), 14)
      return events.filter((e) => {
        if (
          "NMPW".indexOf(e.eventTypeCode) >= 0 &&
          isWithinInterval(e.startDate, { start: threeDaysAgo, end: twoWeeksFromNow })
        ) {
          return true
        }
        return false
      })
    }
    return []
  }

  return (
    <div className="listview listview--hover">
      {upcoming().map((event) => (
        <div key={event.id} style={{ position: "relative" }}>
          <UpcomingEvent event={event} />
          <AdminLink to={event.adminUrl} label="Event administration home" color={colors.teal} />
        </div>
      ))}
    </div>
  )
}

export { UpcomingEvents }
