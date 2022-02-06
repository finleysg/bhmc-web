import { differenceInYears, parseISO } from "date-fns"
import { GetGroupStartName } from "models/reserve"

import { isoDayFormat, sortableDateAndTimeFormat } from "./event-utils"

const standardHeader = [
  "#",
  "Team ID",
  "GHIN",
  "Age",
  "Tee",
  "Last Name",
  "First Name",
  "Full Name",
  "Email",
  "Signed Up By",
  "Signup Date",
]
const canChooseHeader = [
  "#",
  "Team ID",
  "Course",
  "Start",
  "GHIN",
  "Age",
  "Tee",
  "Last Name",
  "First Name",
  "Full Name",
  "Email",
  "Signed Up By",
  "Signup Date",
]

const getStandardEventReportRow = (index, fees, obj) => {
  const values = []
  values.push(index)
  values.push(`id-${obj.registration_id}`)
  values.push(obj.ghin)
  if (obj.birth_date) {
    values.push(differenceInYears(new Date(), parseISO(obj.birth_date)))
  } else {
    values.push("n/a")
  }
  values.push(obj.tee)
  values.push(obj.last_name)
  values.push(obj.first_name)
  values.push(`${obj.first_name} ${obj.last_name}`)
  values.push(obj.email)
  values.push(obj.signed_up_by)
  values.push(isoDayFormat(parseISO(obj.signup_date)))

  fees.forEach((fee) => values.push(obj[fee.name]))

  return values
}

const getCanChooseEventReportRow = (index, clubEvent, obj) => {
  const startName = GetGroupStartName(clubEvent, obj.hole_number, obj.starting_order)

  const values = []
  values.push(index)
  values.push(`${obj.course_name}-${startName}`)
  values.push(obj.course_name)
  values.push(startName)
  values.push(obj.ghin)
  if (obj.birth_date) {
    values.push(differenceInYears(new Date(), parseISO(obj.birth_date)))
  } else {
    values.push("n/a")
  }
  values.push(obj.tee)
  values.push(obj.last_name)
  values.push(obj.first_name)
  values.push(`${obj.first_name} ${obj.last_name}`)
  values.push(obj.email)
  values.push(obj.signed_up_by)
  values.push(isoDayFormat(parseISO(obj.signup_date)))

  clubEvent.fees.forEach((fee) => values.push(obj[fee.name]))

  return values
}

const getPaymentReportRow = (obj) => {
  const paymentAmount = !isNaN(obj.payment_amount) ? +obj.payment_amount : 0
  const transactionFee = !isNaN(obj.transaction_fee) ? +obj.transaction_fee : 0
  const values = []
  values.push(`${obj.user_first_name} ${obj.user_last_name}`)
  values.push(obj.payment_code)
  values.push(isoDayFormat(parseISO(obj.payment_date)))
  values.push((paymentAmount - transactionFee).toFixed(2))
  values.push(transactionFee.toFixed(2))
  values.push(paymentAmount.toFixed(2))
  return values
}

const getSkinsReportRow = (clubEvent, obj) => {
  const startName = clubEvent.canChoose
    ? GetGroupStartName(clubEvent, obj.hole_number, obj.starting_order)
    : "n/a"

  const values = []
  values.push(obj.registration_id)
  values.push(obj.course_name)
  values.push(startName)
  values.push(`${obj.first_name} ${obj.last_name}`)
  values.push(obj.skins_type)
  values.push(+obj.is_paid === 1 ? "Paid" : "")
  values.push(sortableDateAndTimeFormat(parseISO(obj.payment_date)))

  clubEvent.fees.forEach((fee) => values.push(obj[fee.name]))

  return values
}

const getEventReportHeader = (clubEvent) => {
  const feeNames = clubEvent?.fees?.map((f) => f.name) ?? []
  if (clubEvent?.canChoose) {
    return canChooseHeader.concat(feeNames)
  }
  return standardHeader.concat(feeNames)
}

const getSkinsReportHeader = () => {
  return ["Group", "Course", "Start", "Player", "Skins Type", "Paid", "Payment Date"]
}

const getPaymentReportHeader = () => {
  return ["Player", "Payment Code", "Payment Date", "Amount Due", "Transaction Fee", "Total"]
}

const getMembershipReportHeader = (season) => {
  return [
    "#",
    "Registration Id",
    "GHIN",
    "Last Name",
    "First Name",
    "Email",
    "Birth Date",
    "Tee",
    "Signed Up By",
    "Signup Date",
    `New in ${season}`,
    "Previous Member?",
  ]
}

const getEventReportRows = (clubEvent, reportData) => {
  return (
    reportData?.map((obj, index) =>
      clubEvent.canChoose
        ? getCanChooseEventReportRow(index + 1, clubEvent, obj)
        : getStandardEventReportRow(index + 1, clubEvent.fees, obj),
    ) ?? []
  )
}

const getPaymentReportRows = (reportData) => {
  return reportData?.map((obj) => getPaymentReportRow(obj)) ?? []
}

const getSkinsReportRows = (clubEvent, reportData) => {
  return reportData?.map((obj) => getSkinsReportRow(clubEvent, obj)) ?? []
}

const getMembershipReportRow = (obj, index) => {
  const values = []
  values.push(index)
  values.push(obj.registration_id)
  values.push(obj.ghin)
  values.push(obj.last_name)
  values.push(obj.last_name)
  values.push(obj.email)
  values.push(isoDayFormat(parseISO(obj.birth_date)))
  values.push(obj.tee)
  values.push(obj.signed_up_by)
  values.push(isoDayFormat(parseISO(obj.signup_date)))
  values.push(obj.previous_registration_id ? "No" : "Yes")
  values.push(obj.previous_registrations > 0 ? "Yes" : "No")
  return values
}

const getMembershipReportRows = (reportData) => {
  return reportData?.map((obj, index) => getMembershipReportRow(obj, index + 1))
}

export {
  getEventReportHeader,
  getEventReportRows,
  getMembershipReportHeader,
  getMembershipReportRows,
  getPaymentReportHeader,
  getPaymentReportRows,
  getSkinsReportHeader,
  getSkinsReportRows,
}
