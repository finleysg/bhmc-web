import { differenceInYears, parseISO } from "date-fns"

import { isoDayFormat } from "./event-utils"

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

const getPaymentReportRow = (obj) => {
  const values = []
  values.push(obj["last_name"])
  values.push(obj["first_name"])
  values.push(obj["payment_code"])
  values.push(isoDayFormat(parseISO(obj["payment_date"])))
  values.push(obj["fee_name"])
  values.push(obj["amount"])
  //   values.push(obj["payment_amount"])
  //   values.push(obj["transaction_fee"])
  return values
}

const getEventReportHeader = (clubEvent) => {
  const feeNames = clubEvent?.fees?.map((f) => f.name) ?? []
  if (clubEvent.canChoose) {
    return canChooseHeader.concat(feeNames)
  }
  return standardHeader.concat(feeNames)
}

const getPaymentReportHeader = () => {
  return [
    "First Name",
    "Last Name",
    "Payment Code",
    "Payment Date",
    "Fee",
    "Fee Amount",
    // "Payment Amount",
    // "Transaction Fee",
  ]
}

const getEventReportRows = (clubEvent, reportData) => {
  return reportData?.map((obj) => getStandardEventReportRow(clubEvent.fees, obj)) ?? []
}

const getPaymentReportRows = (reportData) => {
  return reportData?.map((obj) => getPaymentReportRow(obj)) ?? []
}

export { getEventReportHeader, getEventReportRows, getPaymentReportHeader, getPaymentReportRows }
