import { addDays, addMonths, isSameDay, isSameMonth, isWithinInterval, startOfWeek, subMonths } from "date-fns"
import { dayNameFormat, monthNameFormat, shortDayNameFormat } from "utils/event-utils"

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
 * @param {Date} date - The date as a javascript date.
 */
function Day(date) {
  this.name = dayNameFormat(date)
  this.shortName = shortDayNameFormat(date)
  this.day = date.getDate() // parseInt(date.format("D"), 10)
  //   this.isCurrentMonth = date.month() === currentMonthNumber
  this.isToday = isSameDay(date, new Date())
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
  //   /**
  //    * Return the first sunday before the calendar month starts.
  //    * @param {number} month - The month as a 0-based number.
  //    * @param {number} year - The year.
  //    */
  //   this.findSunday = (month, year) => {
  //     const firstDay = new Date(year, month, 1)
  //     return startOfWeek(firstDay)
  //   }

  /**
   * Create the collection of weeks for this calendar month.
   * @param {Date} firstSunday - The Sunday before the start of the month.
   * @param {Date} firstDay - The first day of the month.
   */
  this.buildMonth = (firstSunday, firstDay) => {
    const weeks = []
    for (let i = 0; i < 6; i++) {
      const days = this.buildWeek(addDays(firstSunday, i * 7))
      if (i === 0 || isSameMonth(firstDay, days[0].date)) {
        weeks.push({ nbr: i, days })
      }
    }
    return weeks
  }

  /**
   * Create a given week in the month
   * @param {Date} sunday - The Sunday of this week.
   */
  this.buildWeek = (sunday) => {
    const days = []
    for (let i = 0; i < 7; i++) {
      days.push(new Day(addDays(sunday, i)))
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
        const addEvent = isWithinInterval(day.date, {
          start: event.startDate,
          end: event.endDate,
        })
        if (addEvent) {
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
      year: this.firstDay.getFullYear(),
      month: monthNameFormat(this.firstDay),
    }
  }

  /**
   * Returns the following year and long month name.
   */
  this.nextMonth = () => {
    const nextMonth = addMonths(this.firstDay, 1)
    return {
      year: nextMonth.getFullYear(),
      month: monthNameFormat(nextMonth),
    }
  }

  /**
   * Returns the previous year and long month name.
   */
  this.lastMonth = () => {
    const lastMonth = subMonths(this.firstDay, 1)
    return {
      year: lastMonth.getFullYear(),
      month: monthNameFormat(lastMonth),
    }
  }

  this.monthNumber = getMonth(monthName)
  this.firstDay = new Date(year, getMonth(monthName, true), 1)
  this.sunday = startOfWeek(this.firstDay)
  this.weeks = this.buildMonth(this.sunday, this.firstDay)
}

export { Calendar, Day, getMonth, getMonthName }
