import { addDays, isWithinInterval, parse } from "date-fns"
import { immerable } from "immer"
import { dayDateAndTimeFormat, isoDayFormat } from "utils/event-utils"

const mapRegistrationType = (code) => {
  switch (code) {
    case "M":
      return "Members Only"
    case "G":
      return "Guests Allowed"
    case "O":
      return "Open to All"
    default:
      return "None"
  }
}

const mapSkinsType = (code) => {
  switch (code) {
    case "I":
      return "Individual"
    case "T":
      return "Team"
    default:
      return "No Skins"
  }
}

const mapStartType = (code) => {
  switch (code) {
    case "SG":
      return "Shotgun"
    case "TT":
      return "Tee Times"
    default:
      return "Not Applicable"
  }
}
const mapStatusType = (code) => {
  switch (code) {
    case "C":
      return "Canceled"
    case "S":
      return "Scheduled"
    default:
      return "Tentative"
  }
}

const mapEventType = (code) => {
  switch (code) {
    case "N":
      return "Weeknight Event"
    case "W":
      return "Weekend Major"
    case "H":
      return "Holiday Pro-shop Event"
    case "M":
      return "Meeting"
    case "O":
      return "Other"
    case "E":
      return "External Event"
    case "R":
      return "Open Registration"
    case "D":
      return "Deadline"
    case "P":
      return "Open Event"
    case "I":
      return "Invitational"
    default:
      return "Unknown"
  }
}

const slugify = (text) => {
  if (text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace("/", " ")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
  }
  return ""
}

const sampleEvent = {
  can_choose: true,
  event_type: "N",
  external_url: null,
  ghin_required: false,
  group_size: 5,
  id: 6,
  maximum_signup_group_size: 5,
  minimum_signup_group_size: 1,
  name: "Individual Stableford",
  notes: "Event details test",
  payments_end: "2020-11-11T15:00:00-06:00",
  portal_url: null,
  registration_maximum: null,
  registration_type: "M",
  registration_window: "past",
  rounds: 1,
  season_points: 30,
  signup_end: "2020-11-10T18:00:00-06:00",
  signup_start: "2020-11-08T06:00:00-06:00",
  skins_type: "I",
  start_date: "2020-11-11",
  start_time: "5:00 PM",
  start_type: "SG",
  status: "S",
  total_groups: null,
}

const loadingEvent = {
  id: 0,
  name: "loading...",
  notes: "loading...",
  signupWindow: "loading...",
  fees: [],
}

function Hole(json) {
  this.id = +json.id
  this.holeNumber = json.hole_number
  this.par = +json.par
}

function Course(json) {
  this.id = +json.id
  this.name = json.name
  this.numberOfHoles = +json.number_of_holes
  this.holes = json.holes.map((h) => new Hole(h))
}

function EventFee(json) {
  this[immerable] = true
  this.id = +json.id
  this.eventId = +json.event
  this.amount = +json.amount
  this.displayOrder = +json.display_order
  this.name = json.fee_type.name
  this.code = json.fee_type.code
  this.isRequired = !!json.is_required
  this.restriction = json.fee_type.restriction
}

/**
 * A club event object converted to be ui-friendly.
 * @constructor
 * @param {object} json - An event from the api.
 */
function ClubEvent(json) {
  this[immerable] = true
  this.id = json.id
  this.canChoose = json.can_choose
  this.courses = json.can_choose ? json.courses.map((c) => new Course(c)) : []
  this.eventType = mapEventType(json.event_type)
  this.eventTypeCode = json.event_type
  this.externalUrl = json.external_url
  this.fees = json.fees ? json.fees.sort((a, b) => (a.display_order = b.display_order)).map((f) => new EventFee(f)) : []
  this.feeMap = new Map(this.fees.map((f) => [f.id, f]))
  this.ghinRequired = json.ghin_required
  this.groupSize = json.group_size
  this.maximumSignupGroupSize = json.maximum_signup_group_size
  this.minimumSignupGroupSize = json.minimum_signup_group_size
  this.name = json.name
  this.notes = json.notes
  this.paymentsEnd = json.payments_end ? new Date(json.payments_end) : new Date(json.signup_end)
  this.portalUrl = json.portal_url
  this.registrationMaximum = json.registration_maximum
  this.registrationType = mapRegistrationType(json.registration_type)
  this.registrationTypeCode = json.registration_type
  this.registrationWindow = json.registration_window
  this.rounds = json.rounds
  this.seasonPoints = json.season_points
  this.signupStart = new Date(json.signup_start)
  this.signupEnd = new Date(json.signup_end)
  this.skinsType = mapSkinsType(json.skins_type)
  this.skinsTypeCode = json.skins_type
  this.startDate = parse(json.start_date, "yyyy-MM-dd", new Date())
  this.startTime = json.start_time
  this.startType = mapStartType(json.start_type)
  this.startTypeCode = json.start_type
  this.status = mapStatusType(json.status)
  this.statusCode = json.status
  this.totalGroups = json.total_groups
  this.defaultTag = json.default_tag?.name

  // derived properties
  if (this.rounds <= 1) {
    this.endDate = parse(json.start_date, "yyyy-MM-dd", new Date())
  } else {
    this.endDate = addDays(this.startDate, this.rounds - 1)
  }
  this.eventTypeClass = mapEventType(json.event_type).toLowerCase().replace(" ", "-")
  this.eventUrl = `/event/${isoDayFormat(this.startDate)}/${slugify(json.name)}`
  this.adminUrl = `/admin/event/${this.id}`
  this.slugName = slugify(json.name)
  this.slugDate = isoDayFormat(this.startDate)
  this.signupWindow = `${dayDateAndTimeFormat(this.signupStart)} to ${dayDateAndTimeFormat(this.signupEnd)}`
  this.canEditRegistration = Boolean(json.payments_end)
  this.paymentsAreOpen =
    this.registrationTypeCode === "N"
      ? false
      : isWithinInterval(new Date(), {
          start: this.signupStart,
          end: this.paymentsEnd,
        })
  this.registrationIsOpen =
    this.registrationTypeCode === "N"
      ? false
      : isWithinInterval(new Date(), {
          start: this.signupStart,
          end: this.signupEnd,
        })

  /**
   * Returns true if this event starts in the given year and (0-based) month
   * @param {number} year
   * @param {number} month
   */
  this.isCurrent = (year, month) => {
    return this.startDate.getFullYear() === year && this.startDate.getMonth() === month
  }

  /**
   * Returns the number of available spots, without
   * regard to existing or ongoinng registrations.
   */
  this.availableSpots = () => {
    if (this.registrationType === "None") {
      return null
    }
    if (this.canChoose) {
      if (this.startType === "Shotgun") {
        const holes = this.courses[0]?.numberOfHoles
        return 2 * this.groupSize * (this.courses.length * holes)
      } else {
        return this.groupSize * this.totalGroups * this.courses.length
      }
    } else {
      return this.registrationMaximum
    }
  }
}

export { ClubEvent, EventFee, loadingEvent, sampleEvent, slugify }
