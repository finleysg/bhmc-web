import { useClubEvents } from "hooks/event-hooks"
import { Link } from "react-router-dom"
import { dayAndDateFormat } from "utils/event-utils"

import iron from "../../assets/img/Iron.png"
import bucket from "../../assets/img/RangeBucket.png"
import tee from "../../assets/img/TeedUp.png"

const getImage = (eventType) => {
  switch (eventType) {
    case "Weeknight Event":
      return iron
    case "Weekend Major":
      return bucket
    default:
      return tee
  }
}

function UpcomingEvent({ event }) {
  return (
    <Link className="listview__item" to={event.eventUrl}>
      {/* <img alt={event.name} className="listview__img" src={getImage(event.eventType)} /> */}
      <i className={`avatar-char ${event.eventTypeClass}`}>{event.name[0]}</i>
      <div className="listview__content">
        <div className="listview__heading">{event.name}</div>
        <p>{dayAndDateFormat(event.startDate)}</p>
      </div>
    </Link>
  )
}

function UpcomingEvents() {
  const { data: events } = useClubEvents()

  return (
    <div className="listview listview--hover">
      {events && events.map((event) => <UpcomingEvent key={event.id} event={event} />)}
    </div>
  )
}

export { UpcomingEvents }
