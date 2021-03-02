import React from "react"

import { LoadingSpinner } from "components/spinners"
import { useClient } from "context/auth-context"
import { slugify } from "models/club-event"
import {
  getEventReportHeader,
  getEventReportRows,
} from "utils/report-utils"
import { useAsync } from "utils/use-async"

import DownloadButton from "./download-button"

function EventReport({ eventId, clubEvent }) {
  const { data, isLoading, run } = useAsync()
  const client = useClient()

  React.useEffect(() => {
    run(client(`reports/event-report/${eventId}`))
  }, [run, client, eventId])

  const reportName = `${slugify(clubEvent.name)}-event-report.csv`
  const reportHeader = getEventReportHeader(clubEvent)
  const reportData = getEventReportRows(clubEvent, data)

  const getDownloadFile = () => {
    const rows = []
    rows.push(reportHeader.join(","))
    reportData.forEach((row) => rows.push(row.join(",")))
    return rows.join("\r\n")
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-success">{clubEvent.name} Event Report</h4>
        <DownloadButton data={getDownloadFile()} filename={reportName} />
        <div className="card-text">
          <div style={{ overflowY: "auto", overflowX: "auto" }}>
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  {reportHeader.map((h) => (
                    <th key={h.replace(" ", "-").toLowerCase()}>{h}</th>
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
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
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
    </div>
  )
}

export default EventReport
