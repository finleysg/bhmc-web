import moment from "moment"

const mapRegistrationType = (code) => {
  switch (code) {
    case "M":
      return "Member Only"
    case "G":
      return "Guests Allowed"
    case "O":
      return "Open"
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
      return "Open Registration Period"
    case "D":
      return "Deadline"
    case "P":
      return "Open Event"
    default:
      return "Unknown"
  }
}

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace("/", " ")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
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

/**
 * A club event object converted to be ui-friendly.
 * @constructor
 * @param {object} json - An event from the api.
 */
function ClubEvent(json) {
  this.id = json.id
  this.canChoose = json.can_choose
  this.eventType = mapEventType(json.event_type)
  this.eventTypeCode = json.event_type
  this.externalUrl = json.external_url
  this.ghinRequired = json.ghin_required
  this.groupSize = json.group_size
  this.maximumSignupGroupSize = json.maximum_signup_group_size
  this.minimumSignupGroupSize = json.minimum_signup_group_size
  this.name = json.name
  this.notes = json.notes
  this.paymentsEnd = moment(json.payements_end)
  this.portalUrl = json.portal_url
  this.registrationMaximum = json.registration_maximum
  this.registrationType = mapRegistrationType(json.registration_type)
  this.registrationTypeCode = json.registration_type
  this.registrationWindow = json.registration_window
  this.rounds = json.rounds
  this.seasonPoints = json.season_points
  this.signupStart = moment(json.signup_start)
  this.signupEnd = moment(json.signup_end)
  this.skinsType = mapSkinsType(json.skins_type)
  this.skinsTypeCode = json.skins_type
  this.startDate = moment(json.start_date)
  this.startTime = json.start_time
  this.startType = mapStartType(json.start_type)
  this.startTypeCode = json.start_type
  this.status = mapStatusType(json.status)
  this.statusCode = json.status
  this.totalGroups = json.total_groups

  // derived properties
  if (this.rounds <= 1) {
    this.endDate = moment(json.start_date)
  } else {
    this.endDate = moment(json.start_date).add(this.rounds - 1, "days")
  }
  this.eventTypeClass = mapEventType(json.event_type).toLowerCase().replace(" ", "-")
  this.eventUrl = `/event/${this.startDate.format("yyyy-MM-DD")}/${slugify(json.name)}`
}

export { ClubEvent, sampleEvent }