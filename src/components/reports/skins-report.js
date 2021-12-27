import React from "react"

import { LoadingSpinner } from "components/spinners"
import { useClient } from "context/auth-context"
import { slugify } from "models/club-event"
import { getSkinsReportHeader, getSkinsReportRows } from "utils/report-utils"
import { useAsync } from "utils/use-async"

import DownloadButton from "./download-button"

function SkinsReport({ eventId, clubEvent }) {
  const { data, isLoading, run } = useAsync()
  const client = useClient()

  React.useEffect(() => {
    run(client(`reports/skins-report/${eventId}`))
  }, [run, client, eventId])

  const reportName = `${slugify(clubEvent.name)}-skins-report.csv`
  const reportHeader = getSkinsReportHeader(clubEvent)
  const reportData = getSkinsReportRows(clubEvent, data)

  const getDownloadFile = () => {
    const rows = []
    rows.push(reportHeader.join(","))
    reportData.forEach((row) => rows.push(row.join(",")))
    return rows.join("\r\n")
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-success">{clubEvent.name} Skins Report</h4>
        <DownloadButton data={getDownloadFile()} filename={reportName} />
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
                              overflow: "hidden",
                              maxWidth: "200px",
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

export default SkinsReport
