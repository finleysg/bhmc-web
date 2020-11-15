import moment from "moment"

function getMonth(name, zeroBased = true) {
  let m = 0
  switch (name.toLowerCase()) {
    case "january":
    case "jan":
      m = 0
      break
    case "february":
    case "feb":
      m = 1
      break
    case "march":
    case "mar":
      m = 2
      break
    case "april":
    case "apr":
      m = 3
      break
    case "may":
      m = 4
      break
    case "june":
    case "jun":
      m = 5
      break
    case "july":
    case "jul":
      m = 6
      break
    case "august":
    case "aug":
      m = 7
      break
    case "september":
    case "sep":
      m = 8
      break
    case "october":
    case "oct":
      m = 9
      break
    case "november":
    case "nov":
      m = 10
      break
    case "december":
    case "dec":
      m = 11
      break
    default:
      m = 0
      break
  }
  if (!zeroBased) {
    m += 1
  }
  return m
}

function getMonthName(nbr, zeroBased = true) {
  let name = "Invalid"
  if (!zeroBased) {
    nbr -= 1
  }
  switch (nbr) {
    case 0:
      name = "January"
      break
    case 1:
      name = "February"
      break
    case 2:
      name = "March"
      break
    case 3:
      name = "April"
      break
    case 4:
      name = "May"
      break
    case 5:
      name = "June"
      break
    case 6:
      name = "July"
      break
    case 7:
      name = "August"
      break
    case 8:
      name = "September"
      break
    case 9:
      name = "October"
      break
    case 10:
      name = "November"
      break
    case 11:
      name = "December"
      break
    default:
      name = "Invalid"
      break
  }
  return name
}

/**
 * Represents a calendar day with a collection of zero to many events.
 * @constructor
 * @param {moment} date - The date as a moment.
 */
function Day(date) {
  this.name = date.format("dddd")
  this.shortName = date.format("ddd")
  this.day = parseInt(date.format("D"), 10)
  //   this.isCurrentMonth = date.month() === currentMonthNumber
  this.isToday = date.isSame(new Date(), "day")
  this.date = date
  this.events = []
  this.hasEvents = () => {
    return this.events && this.events.length > 0
  }
}

/**
 * Represents a calendar month with a collection of weeks, which
 * each have a collection of days. Every week is a full 7 days, so
 * days from the previous and following months are included.
 * @constructor
 * @param {number} year - The year.
 * @param {string} monthName - The name of the month.
 */
function Calendar(year, monthName) {
  /**
   * Return the first sunday before the calendar month starts.
   * @param {number} month - The month as a 0-based number.
   * @param {number} year - The year.
   */
  this.findSunday = (month, year) => {
    const start = moment([year, month, 1])
    let dow = start.day()
    while (dow > 0) {
      start.add(-1, "d")
      dow = start.day()
    }
    return start
  }

  /**
   * Create the collection of weeks for this calendar month.
   * @param {moment} firstSunday - The Sunday before the start of the month.
   * @param {moment} firstDay - The first day of the month.
   */
  this.buildMonth = (firstSunday, firstDay) => {
    const weeks = []
    const startDate = firstSunday.clone()
    let done = false,
      monthIndex = startDate.month(),
      count = 0
    while (!done) {
      weeks.push({ nbr: count, days: this.buildWeek(startDate.clone()) })
      startDate.add(1, "w")
      done = count++ > 2 && monthIndex !== startDate.month()
      monthIndex = startDate.month()
    }
    return weeks
  }

  /**
   * Create a given week in the month
   * @param {moment} sunday - The Sunday of this week.
   */
  this.buildWeek = (sunday) => {
    const days = []
    for (let i = 0; i < 7; i++) {
      days.push(new Day(sunday))
      sunday = sunday.clone()
      sunday.add(1, "d")
    }
    return days
  }

  /**
   * Add a club event, which is associated with the day(s) in the
   * calendar based on the start date and # of rounds.
   * @param {ClubEvent} event - The club event to add to the calendar.
   */
  this.addEvent = (event) => {
    for (const week of this.weeks) {
      for (const day of week.days) {
        if (day.date.isBetween(event.startDate, event.endDate, "day", "[]")) {
          day.events.push(event)
        }
      }
    }
  }

  /**
   * Does this calendar month have any club events?
   */
  this.hasEvents = () => {
    let result = false
    for (const week of this.weeks) {
      for (const day of week.days) {
        if (day.hasEvents()) {
          result = true
          break
        }
      }
    }
    return result
  }

  /**
   * Returns the current year and long month name.
   */
  this.thisMonth = () => {
    return {
      year: this.firstDay.year(),
      month: this.firstDay.format("MMMM"),
    }
  }

  /**
   * Returns the following year and long month name.
   */
  this.nextMonth = () => {
    const mth = this.firstDay.clone().add(1, "months")
    return {
      year: mth.year(),
      month: mth.format("MMMM"),
    }
  }

  /**
   * Returns the previous year and long month name.
   */
  this.lastMonth = () => {
    const mth = this.firstDay.clone().subtract(1, "months")
    return {
      year: mth.year(),
      month: mth.format("MMMM"),
    }
  }

  this.monthNumber = getMonth(monthName)
  this.firstDay = moment([year, getMonth(monthName), 1])
  this.sunday = this.findSunday(this.monthNumber, year)
  this.weeks = this.buildMonth(this.sunday, this.firstDay)
}

export { Calendar, Day, getMonth, getMonthName }
