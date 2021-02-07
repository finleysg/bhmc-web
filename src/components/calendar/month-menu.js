import React from "react"

import { Link } from "react-router-dom"

import { getMonthName } from "./calendar-utils"

function MonthMenu(props) {
  const { currentYear, ...rest } = props
  const [showMenu, setShowMenu] = React.useState(false)
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  return (
    <div className="actions actions--inverse" onClick={() => setShowMenu(!showMenu)} {...rest}>
      <div className="dropdown">
        {/* <i className="actions__item">
          <IoMdMenu />
        </i> */}
        {props.children}
        <div className={`dropdown-menu ${showMenu ? "show" : ""}`}>
          {months.map((m) => {
            return (
              <Link
                key={m}
                to={`/calendar/${currentYear}/${getMonthName(m).toLowerCase()}`}
                className="nav-link"
                style={{ padding: ".5rem 1rem" }}
              >
                {getMonthName(m)}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { MonthMenu }
