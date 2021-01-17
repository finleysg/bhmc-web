import { addDays, format, subDays } from "date-fns"

const TestEventType = {
  season: 1,
  match: 2,
  major: 3,
  weeknight: 4,
  open: 5,
  guest: 6,
}

const SeasonRegistrationEvent = {
  id: TestEventType.season,
  name: "Test Season Signup",
  rounds: null,
  ghin_required: false,
  total_groups: null,
  minimum_signup_group_size: 1,
  maximum_signup_group_size: 1,
  group_size: null,
  start_type: null,
  can_choose: false,
  registration_window: "registration",
  external_url: null,
  notes: "notes",
  event_type: "R",
  skins_type: null,
  season_points: null,
  portal_url: null,
  start_date: format(subDays(new Date(), 1), "yyyy-MM-dd"),
  start_time: "Open",
  registration_type: "O",
  signup_start: subDays(new Date(), 1).toISOString(),
  signup_end: addDays(new Date(), 7).toISOString(),
  payments_end: null,
  registration_maximum: null,
  courses: [],
  fees: [
    {
      id: 1,
      fee_type: { id: 1, name: "Returning Member Dues", code: "RMD" },
      amount: "90.00",
      is_required: true,
      display_order: 1,
    },
    {
      id: 2,
      fee_type: { id: 2, name: "New Member Dues", code: "NMD" },
      amount: "105.00",
      is_required: true,
      display_order: 2,
    },
    {
      id: 3,
      fee_type: { id: 3, name: "Patron Card", code: "PC" },
      amount: "55.00",
      is_required: false,
      display_order: 3,
    },
    {
      id: 4,
      fee_type: { id: 4, name: "Sr. Patron Card", code: "SPC" },
      amount: "32.00",
      is_required: false,
      display_order: 4,
    },
  ],
}

const MatchPlayEvent = {
  can_choose: false,
  courses: [],
  event_type: "O",
  external_url: null,
  fees: [
    {
      amount: "30.00",
      display_order: 1,
      fee_type: { id: 5, name: "Event Fee", code: "E" },
      id: 5,
      is_required: true,
    },
    {
      amount: "0.00",
      display_order: 2,
      fee_type: { id: 6, name: "Gross Division (no handicap)", code: "GD" },
      id: 6,
      is_required: false,
    },
    {
      amount: "0.00",
      display_order: 3,
      fee_type: { id: 7, name: "Net Division (no handicap)", code: "ND" },
      id: 7,
      is_required: false,
    },
  ],
  ghin_required: true,
  group_size: null,
  id: TestEventType.match,
  maximum_signup_group_size: 1,
  minimum_signup_group_size: 1,
  name: "Test Season Long Match Play",
  notes: "",
  payments_end: null,
  portal_url: null,
  registration_maximum: null,
  registration_type: "M",
  registration_window: "registration",
  rounds: null,
  season: 2021,
  season_points: null,
  signup_end: "2021-04-25T18:00:00-05:00",
  signup_start: "2021-01-10T06:00:00-06:00",
  skins_type: null,
  start_date: "2021-05-01",
  start_time: "Make Your Own Tee Times",
  start_type: "NA",
  total_groups: null,
}

const MajorEvent = {
  can_choose: false,
  courses: [],
  event_type: "W",
  external_url: null,
  fees: [
    {
      amount: "10.00",
      display_order: 1,
      fee_type: { id: 5, name: "Event Fee", code: "E" },
      id: 5,
      is_required: true,
    },
    {
      amount: "10.00",
      display_order: 2,
      fee_type: { id: 8, name: "Gross Skins", code: "GS" },
      id: 8,
      is_required: false,
    },
    {
      amount: "10.00",
      display_order: 3,
      fee_type: { id: 9, name: "Net Skins", code: "NS" },
      id: 9,
      is_required: false,
    },
    {
      amount: "40.00",
      display_order: 4,
      fee_type: { id: 10, name: "Greens Fee", code: "GF" },
      id: 10,
      is_required: false,
    },
    {
      amount: "20.00",
      display_order: 5,
      fee_type: { id: 11, name: "Cart Fee", code: "CF" },
      id: 11,
      is_required: false,
    },
  ],
  ghin_required: true,
  group_size: 4,
  id: TestEventType.major,
  maximum_signup_group_size: 4,
  minimum_signup_group_size: 1,
  name: "Test Major",
  notes: "",
  payments_end: "2021-04-25T18:00:00-05:00",
  portal_url: null,
  registration_maximum: 100,
  registration_type: "M",
  registration_window: "registration",
  rounds: 1,
  season: 2021,
  season_points: 60,
  signup_end: "2021-04-25T18:00:00-05:00",
  signup_start: "2021-01-10T06:00:00-06:00",
  skins_type: "I",
  start_date: "2021-05-01",
  start_time: "Morning Swing",
  start_type: "TT",
  total_groups: null,
}

const WeeknightEvent = {
  can_choose: true,
  courses: [1, 4, 9],
  event_type: "N",
  external_url: null,
  fees: [
    {
      amount: "5.00",
      display_order: 1,
      fee_type: { id: 5, name: "Event Fee", code: "E" },
      id: 5,
      is_required: true,
    },
    {
      amount: "5.00",
      display_order: 2,
      fee_type: { id: 8, name: "Gross Skins", code: "GS" },
      id: 8,
      is_required: false,
    },
    {
      amount: "5.00",
      display_order: 3,
      fee_type: { id: 9, name: "Net Skins", code: "NS" },
      id: 9,
      is_required: false,
    },
    {
      amount: "20.00",
      display_order: 4,
      fee_type: { id: 10, name: "Greens Fee", code: "GF" },
      id: 10,
      is_required: false,
    },
    {
      amount: "10.00",
      display_order: 5,
      fee_type: { id: 11, name: "Cart Fee", code: "CF" },
      id: 11,
      is_required: false,
    },
  ],
  ghin_required: true,
  group_size: 5,
  id: TestEventType.weeknight,
  maximum_signup_group_size: 5,
  minimum_signup_group_size: 1,
  name: "Test Weeknight Event",
  notes: "",
  payments_end: "2021-04-25T18:00:00-05:00",
  portal_url: null,
  registration_maximum: null,
  registration_type: "M",
  registration_window: "registration",
  rounds: 1,
  season: 2021,
  season_points: 30,
  signup_end: "2021-04-25T18:00:00-05:00",
  signup_start: "2021-01-10T06:00:00-06:00",
  skins_type: "I",
  start_date: "2021-05-01",
  start_time: "3:00 PM",
  start_type: "TT",
  total_groups: "18",
}

const OpenEvent = {
  can_choose: false,
  courses: [],
  event_type: "O",
  external_url: null,
  fees: [
    {
      amount: "10.00",
      display_order: 1,
      fee_type: { id: 5, name: "Event Fee", code: "E" },
      id: 5,
      is_required: true,
    },
    {
      amount: "10.00",
      display_order: 2,
      fee_type: { id: 8, name: "Gross Skins", code: "GS" },
      id: 8,
      is_required: false,
    },
    {
      amount: "10.00",
      display_order: 3,
      fee_type: { id: 9, name: "Net Skins", code: "NS" },
      id: 9,
      is_required: false,
    },
    {
      amount: "40.00",
      display_order: 4,
      fee_type: { id: 10, name: "Greens Fee", code: "GF" },
      id: 10,
      is_required: false,
    },
    {
      amount: "20.00",
      display_order: 5,
      fee_type: { id: 11, name: "Cart Fee", code: "CF" },
      id: 11,
      is_required: false,
    },
  ],
  ghin_required: true,
  group_size: 4,
  id: TestEventType.open,
  maximum_signup_group_size: 4,
  minimum_signup_group_size: 1,
  name: "Test Open Event",
  notes: "",
  payments_end: "2021-04-25T18:00:00-05:00",
  portal_url: null,
  registration_maximum: 100,
  registration_type: "O",
  registration_window: "registration",
  rounds: 1,
  season: 2021,
  season_points: 0,
  signup_end: "2021-04-25T18:00:00-05:00",
  signup_start: "2021-01-10T06:00:00-06:00",
  skins_type: "I",
  start_date: "2021-05-01",
  start_time: "Morning Swing",
  start_type: "TT",
  total_groups: null,
}

const MemberGuestEvent = {
  can_choose: false,
  courses: [],
  event_type: "O",
  external_url: null,
  fees: [
    {
      amount: "10.00",
      display_order: 1,
      fee_type: { id: 5, name: "Event Fee", code: "E" },
      id: 5,
      is_required: true,
    },
    {
      amount: "10.00",
      display_order: 2,
      fee_type: { id: 8, name: "Gross Skins", code: "GS" },
      id: 8,
      is_required: false,
    },
    {
      amount: "10.00",
      display_order: 3,
      fee_type: { id: 9, name: "Net Skins", code: "NS" },
      id: 9,
      is_required: false,
    },
    {
      amount: "40.00",
      display_order: 4,
      fee_type: { id: 10, name: "Greens Fee", code: "GF" },
      id: 10,
      is_required: false,
    },
    {
      amount: "20.00",
      display_order: 5,
      fee_type: { id: 11, name: "Cart Fee", code: "CF" },
      id: 11,
      is_required: false,
    },
    {
      amount: "10.00",
      display_order: 6,
      fee_type: { id: 12, name: "Additional Guest Team", code: "AG" },
      id: 12,
      is_required: false,
    },
  ],
  ghin_required: false,
  group_size: 4,
  id: TestEventType.guest,
  maximum_signup_group_size: 4,
  minimum_signup_group_size: 2,
  name: "Test Member Guest",
  notes: "",
  payments_end: "2021-04-25T18:00:00-05:00",
  portal_url: null,
  registration_maximum: 100,
  registration_type: "G",
  registration_window: "registration",
  rounds: 1,
  season: 2021,
  season_points: 0,
  signup_end: "2021-04-25T18:00:00-05:00",
  signup_start: "2021-01-10T06:00:00-06:00",
  skins_type: "I",
  start_date: "2021-05-01",
  start_time: "1:00 PM",
  start_type: "SG",
  total_groups: null,
}

const getEvent = (eventType) => {
  switch (eventType) {
    case TestEventType.season:
      return SeasonRegistrationEvent
    case TestEventType.match:
      return MatchPlayEvent
    case TestEventType.major:
      return MajorEvent
    case TestEventType.weeknight:
      return WeeknightEvent
    case TestEventType.open:
      return OpenEvent
    case TestEventType.guest:
      return MemberGuestEvent
    default:
      return null
  }
}

const getTestEvent = ({ eventType, state }) => {
  let now = new Date()
  if (state === "future") {
    now = addDays(now, 30)
  } else if (state === "past") {
    now = subDays(now, 30)
  } else {
    now = addDays(now, 7)
  }
  const dateFields = {
    start_date: format(now, "yyyy-MM-dd"),
    signup_start: subDays(now, 14).toISOString(),
    signup_end: subDays(now, 4).toISOString(),
    payments_end: subDays(now, 1).toISOString(),
    registration_window: state ?? "registration",
  }
  return Object.assign(getEvent(eventType), dateFields)
}

const getTestEvents = () => {
  return [
    getTestEvent({ eventType: TestEventType.season }),
    getTestEvent({ eventType: TestEventType.match }),
    getTestEvent({ eventType: TestEventType.major, state: "future" }),
    getTestEvent({ eventType: TestEventType.weeknight, state: "future" }),
    getTestEvent({ eventType: TestEventType.open, state: "future" }),
    getTestEvent({ eventType: TestEventType.guest, state: "future" }),
  ]
}

export { getTestEvent, getTestEvents, TestEventType }
