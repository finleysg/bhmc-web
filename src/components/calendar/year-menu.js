import React from "react"

import { Link } from "react-router-dom"
import * as config from "utils/app-config"

function YearMenu(props) {
  const { currentMonth, ...rest } = props
  const [showMenu, setShowMenu] = React.useState(false)

  const seasons = () => {
    const startAt = 2017
    const size = config.currentSeason - startAt + 1
    return [...Array(size).keys()].map((i) => i + startAt).reverse()
  }

  return (
    <div className="actions actions--inverse" onClick={() => setShowMenu(!showMenu)} {...rest}>
      <div className="dropdown">
        {props.children}
        <div className={`dropdown-menu ${showMenu ? "show" : ""}`}>
          {seasons().map((season) => {
            return (
              <Link
                key={season}
                to={`/calendar/${season}/${currentMonth}`}
                className="nav-link"
                style={{ padding: ".5rem 1rem" }}
              >
                {season}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { YearMenu }
