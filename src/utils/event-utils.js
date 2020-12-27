import { format, isDate, isValid } from "date-fns"

const isoDayFormat = (dt) => {
  if (dt && isDate(dt) && isValid(dt)) {
    return format(dt, "yyyy-MM-dd")
  }
  return ""
}

const dayAndDateFormat = (dt) => {
  if (dt && isDate(dt) && isValid(dt)) {
    return format(dt, "iiii, MMMM do")
  }
  return ""
}

const dayDateAndTimeFormat = (dt) => {
  if (dt && isDate(dt) && isValid(dt)) {
    return format(dt, "iiii, MMMM do h:mm aaaa")
  }
  return ""
}

export { dayAndDateFormat, dayDateAndTimeFormat, isoDayFormat }
