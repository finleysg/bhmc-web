import { differenceInYears, parseISO } from "date-fns"
import { GetGroupStartName } from "models/reserve"

import { isoDayFormat, sortableDateAndTimeFormat } from "./event-utils"

const standardHeader = [
  "Group",
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
  "Group",
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

const getStandardEventReportRow = (fees, obj) => {
  const values = []
  values.push(obj["registration_id"])
  values.push(obj["ghin"])
  if (Boolean(obj["birth_date"])) {
    values.push(differenceInYears(new Date(), parseISO(obj["birth_date"])))
  } else {
    values.push("n/a")
  }
  values.push(obj["tee"])
  values.push(obj["last_name"])
  values.push(obj["first_name"])
  values.push(`${obj["first_name"]} ${obj["last_name"]}`)
  values.push(obj["email"])
  values.push(obj["signed_up_by"])
  values.push(isoDayFormat(parseISO(obj["signup_date"])))

  fees.forEach((fee) => values.push(obj[fee.name]))

  return values
}

const getCanChooseEventReportRow = (clubEvent, obj) => {
  const startName = GetGroupStartName(clubEvent, obj["hole_number"], obj["starting_order"])

  const values = []
  values.push(obj["registration_id"])
  values.push(obj["course_name"])
  values.push(startName)
  values.push(obj["ghin"])
  if (Boolean(obj["birth_date"])) {
    values.push(differenceInYears(new Date(), parseISO(obj["birth_date"])))
  } else {
    values.push("n/a")
  }
  values.push(obj["tee"])
  values.push(obj["last_name"])
  values.push(obj["first_name"])
  values.push(`${obj["first_name"]} ${obj["last_name"]}`)
  values.push(obj["email"])
  values.push(obj["signed_up_by"])
  values.push(isoDayFormat(parseISO(obj["signup_date"])))

  clubEvent.fees.forEach((fee) => values.push(obj[fee.name]))

  return values
}

const getPaymentReportRow = (obj) => {
  const paymentAmount = !isNaN(obj["payment_amount"]) ? +obj["payment_amount"] : 0
  const transactionFee = !isNaN(obj["transaction_fee"]) ? +obj["transaction_fee"] : 0
  const values = []
  values.push(`${obj["user_first_name"]} ${obj["user_last_name"]}`)
  values.push(obj["payment_code"])
  values.push(isoDayFormat(parseISO(obj["payment_date"])))
  values.push((paymentAmount - transactionFee).toFixed(2))
  values.push(transactionFee.toFixed(2))
  values.push(paymentAmount.toFixed(2))
  return values
}

const getSkinsReportRow = (clubEvent, obj) => {
  const startName = GetGroupStartName(clubEvent, obj["hole_number"], obj["starting_order"])

  const values = []
  values.push(obj["registration_id"])
  values.push(obj["course_name"])
  values.push(startName)
  values.push(`${obj["first_name"]} ${obj["last_name"]}`)
  values.push(obj["skins_type"])
  values.push(+obj["is_paid"] === 1 ? "Paid" : "")
  values.push(sortableDateAndTimeFormat(parseISO(obj["payment_date"])))

  clubEvent.fees.forEach((fee) => values.push(obj[fee.name]))

  return values
}

const getEventReportHeader = (clubEvent) => {
  const feeNames = clubEvent?.fees?.map((f) => f.name) ?? []
  if (clubEvent.canChoose) {
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

const getEventReportRows = (clubEvent, reportData) => {
  return (
    reportData?.map((obj) =>
      clubEvent.canChoose
        ? getCanChooseEventReportRow(clubEvent, obj)
        : getStandardEventReportRow(clubEvent.fees, obj),
    ) ?? []
  )
}

const getPaymentReportRows = (reportData) => {
  return reportData?.map((obj) => getPaymentReportRow(obj)) ?? []
}

const getSkinsReportRows = (clubEvent, reportData) => {
  return reportData?.map((obj) => getSkinsReportRow(clubEvent, obj)) ?? []
}

export {
  getEventReportHeader,
  getEventReportRows,
  getPaymentReportHeader,
  getPaymentReportRows,
  getSkinsReportHeader,
  getSkinsReportRows,
}
