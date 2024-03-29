import { format, isDate, isValid } from "date-fns"

const getDayName = (dt) => {
  const dow = dt.getDay()
  if (dow === 0) {
    return "Sunday"
  } else if (dow === 1) {
    return "Monday"
  } else if (dow === 1) {
    return "Tuesday"
  } else if (dow === 1) {
    return "Wednesday"
  } else if (dow === 1) {
    return "Thursday"
  } else if (dow === 1) {
    return "Friday"
  } else if (dow === 1) {
    return "Saturday"
  }
}

const getShortDayName = (dt) => {
  const dow = dt.getDay()
  if (dow === 0) {
    return "Sun"
  } else if (dow === 1) {
    return "Mon"
  } else if (dow === 1) {
    return "Tue"
  } else if (dow === 1) {
    return "Wed"
  } else if (dow === 1) {
    return "Thu"
  } else if (dow === 1) {
    return "Fri"
  } else if (dow === 1) {
    return "Sat"
  }
}

const isoDayFormat = (dt) => {
  if (dt && isDate(dt) && isValid(dt)) {
    return format(dt, "yyyy-MM-dd")
  }
  return "--"
}

const dayAndDateFormat = (dt) => {
  if (dt && isDate(dt) && isValid(dt)) {
    return format(dt, "iii, MMMM do")
  }
  return "--"
}

const dayDateAndTimeFormat = (dt) => {
  if (dt && isDate(dt) && isValid(dt)) {
    return format(dt, "iii, MMMM do h:mm aaaa")
  }
  return "--"
}

const sortableDateAndTimeFormat = (dt) => {
  if (dt && isDate(dt) && isValid(dt)) {
    return format(dt, "yyyy-MM-dd hh:mm")
  }
  return ""
}

const dayNameFormat = (dt) => {
  try {
    if (dt && isDate(dt) && isValid(dt)) {
      return format(dt, "iiii")
    }
    return "--"
  } catch (error) {
    return getDayName(dt)
  }
}

const shortDayNameFormat = (dt) => {
  try {
    if (dt && isDate(dt) && isValid(dt)) {
      return format(dt, "iii")
    }
    return "--"
  } catch (error) {
    return getShortDayName(dt)
  }
}

const monthNameFormat = (dt) => {
  if (dt && isDate(dt) && isValid(dt)) {
    return format(dt, "MMMM")
  }
  return "--"
}

const shortMonthNameFormat = (dt) => {
  if (dt && isDate(dt) && isValid(dt)) {
    return format(dt, "MMM")
  }
  return "--"
}

const getClubEvent = ({ events, eventId, eventDate, eventName }) => {
  if (!eventId) {
    return events.find((ce) => ce.slugDate === eventDate && ce.slugName === eventName)
  }
  return events.find((e) => e.id === eventId)
}

export {
  dayAndDateFormat,
  dayDateAndTimeFormat,
  dayNameFormat,
  getClubEvent,
  isoDayFormat,
  monthNameFormat,
  shortDayNameFormat,
  shortMonthNameFormat,
  sortableDateAndTimeFormat,
}
