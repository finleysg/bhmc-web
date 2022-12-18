import React from "react"

import ResultDetail from "components/results/result-detail"
import { Tab, Tabs } from "components/tabs"
import { useSettings } from "hooks/use-settings"
import { FaCalendarAlt } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"

export function SeasonMenu({ baseUrl, season, startAt }) {
  const { currentSeason } = useSettings()
  const [showMenu, setShowMenu] = React.useState(false)

  const seasons = () => {
    const size = currentSeason - startAt + 1
    return [...Array(size).keys()].map((i) => i + startAt)
  }

  return (
    <div className="actions" style={{ zIndex: 10 }} onClick={() => setShowMenu(!showMenu)}>
      <div className="dropdown">
        {season}{" "}
        <i className="actions__item" title="Change Season">
          <FaCalendarAlt />
        </i>
        <div className={`dropdown-menu dropdown-menu-right ${showMenu ? "show" : ""}`}>
          {seasons()
            .reverse()
            .map((year) => {
              return (
                <Link
                  key={year}
                  onClick={() => setShowMenu(false)}
                  to={`${baseUrl}/${year}`}
                  className="dropdown-item"
                >
                  {year}
                </Link>
              )
            })}
        </div>
      </div>
    </div>
  )
}

function ResultsPage() {
  const { eventType, season } = useParams()

  return (
    <div className="content__inner">
      <SeasonMenu baseUrl={`/results/${eventType}`} season={season} startAt={2013} />
      <div>
        <Tabs>
          <Tab to={`/results/weeknight-events/${season}`}>Weeknight Events</Tab>
          <Tab to={`/results/weekend-majors/${season}`}>Weekend Majors</Tab>
          <Tab to={`/results/other/${season}`}>Other Events</Tab>
        </Tabs>
        <ResultDetail eventType={eventType} season={season} />
      </div>
    </div>
  )
}

export default ResultsPage
