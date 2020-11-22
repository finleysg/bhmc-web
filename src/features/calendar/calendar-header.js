import { IconButton } from "components/buttons"
import { IconContext } from "react-icons"
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io"

function CalendarHeader({ calendar }) {
  return (
    <IconContext.Provider value={{ color: "white", className: "month-nav" }}>
      <header>
        <div className="month-title">
          <IconButton
            to={`/calendar/${calendar.lastMonth().year}/${calendar.lastMonth().month.toLowerCase()}`}
            color="transparent"
          >
            <IoIosSkipBackward />
          </IconButton>
          <span>
            {calendar.thisMonth().month} {calendar.thisMonth().year}
          </span>
          <IconButton
            to={`/calendar/${calendar.nextMonth().year}/${calendar.nextMonth().month.toLowerCase()}`}
            color="transparent"
          >
            <IoIosSkipForward />
          </IconButton>
        </div>
      </header>
    </IconContext.Provider>
  )
}

export { CalendarHeader }
