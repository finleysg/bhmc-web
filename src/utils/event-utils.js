import { format, isDate } from "date-fns"

const dayAndDateFormat = (dt) => {
  if (isDate(dt)) {
    return format(dt, "iiii, MMMM do")
  }
}

const dayDateAndTimeFormat = (dt) => {
  if (isDate(dt)) {
    return format(dt, "iiii, MMMM do h:mm aaaa")
  }
}

export { dayAndDateFormat, dayDateAndTimeFormat }
