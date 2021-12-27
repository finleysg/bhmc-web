import React from "react"

import { LoadingSpinner } from "components/spinners"
import { useClient } from "context/auth-context"
import { slugify } from "models/club-event"
import { getPaymentReportHeader, getPaymentReportRows } from "utils/report-utils"
import { useAsync } from "utils/use-async"

import DownloadButton from "./download-button"

function PaymentReport({ eventId, clubEvent }) {
  const { data, isLoading, run } = useAsync()
  const client = useClient()

  React.useEffect(() => {
    run(client(`reports/payment-report/${eventId}`))
  }, [run, client, eventId])

  const reportName = `${slugify(clubEvent.name)}-payment-report.csv`
  const reportHeader = getPaymentReportHeader()
  const reportData = getPaymentReportRows(data)

  const getDownloadFile = () => {
    const rows = []
    rows.push(reportHeader.join(","))
    reportData.forEach((row) => rows.push(row.join(",")))
    return rows.join("\r\n")
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-success">{clubEvent.name} Payment Report</h4>
        <DownloadButton data={getDownloadFile()} filename={reportName} />
        <div style={{ overflowY: "auto", overflowX: "auto" }}>
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                {reportHeader.map((h, hx) => (
                  <th
                    key={h.replace(" ", "-").toLowerCase()}
                    style={{ textAlign: hx < 3 ? "left" : "right" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                reportData.map((row, rx) => {
                  return (
                    <tr key={rx}>
                      {row.map((cell, cx) => {
                        return (
                          <td
                            key={`${cx}-${cell}`}
                            style={{
                              fontSize: ".9rem",
                              maxWidth: "200px",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              textAlign: cx < 3 ? "left" : "right",
                            }}
                          >
                            {cell}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
            </tbody>
          </table>
          <LoadingSpinner loading={isLoading} />
        </div>
      </div>
    </div>
  )
}

export default PaymentReport
