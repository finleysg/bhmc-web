import { addDays, addMinutes, format, subDays } from "date-fns"

export const testSeasonRegistrationEvent = {
  id: 1,
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
  notes: "Thank you for considering our club for the 2021 season!",
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
  documents: [],
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
  registrations: [],
}

export const previousSeasonRegistration = {
  id: 1,
  event: -1,
  hole: null,
  registration: 1,
  starting_order: 0,
  slot: 0,
  status: "R",
  player: 1,
}

export const currentSeasonRegistration = {
  id: 100,
  event: 1,
  hole: null,
  registration: 100,
  starting_order: 0,
  slot: 0,
  status: "R",
  player: 1,
}

export const newRegistrationResponse = {
  id: 100,
  event: 1,
  course: null,
  signed_up_by: "Stuart Finley",
  starting_hole: 1,
  starting_order: 0,
  notes: null,
  slots: [
    {
      id: 11,
      event: 1,
      hole: null,
      registration: 100,
      starting_order: 0,
      slot: 0,
      status: "P",
      player: 1,
    },
  ],
  expires: addMinutes(new Date(), 10).toISOString(),
}

export const paymentRequest = {
  event: 1,
  user: 1,
  notification_type: "R",
  payment_details: [
    { event_fee: 1, registration_slot: 11 },
    { event_fee: 3, registration_slot: 11 },
  ],
}

export const paymentResponse = {
  id: 32,
  event: 1,
  user: 1,
  payment_code: "pi_1HtMx3G3m1mtgUwuXQ58Ivgh",
  payment_key: "pi_1HtMx3G3m1mtgUwuXQ58Ivgh_secret_dIEqOjzXDsgsAEKjsUOAfdNkr",
  notification_type: "R",
  confirmed: false,
  payment_amount: "149.64",
  transaction_fee: "4.64",
  payment_details: [
    { id: 51, event_fee: 1, registration_slot: 11, payment: 32 },
    { id: 52, event_fee: 3, registration_slot: 11, payment: 32 },
  ],
}

export const testUser = {
  id: 1,
  username: "finleysg",
  first_name: "Stuart",
  last_name: "Finley",
  email: "finleysg@gmail.com",
  is_authenticated: true,
  is_staff: true,
  is_active: true,
  groups: [],
}

export const testPlayer = [
  {
    id: 1,
    first_name: "Stuart",
    last_name: "Finley",
    email: "finleysg@gmail.com",
    phone_number: "612-723-1335",
    ghin: "125741",
    tee: "Club",
    birth_date: "1960-10-27",
    save_last_card: true,
    profile_picture: null,
  },
]
