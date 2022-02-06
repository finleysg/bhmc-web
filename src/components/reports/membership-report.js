import React from "react"

import { LoadingSpinner } from "components/spinners"
import { useClient } from "context/auth-context"
import { useSettings } from "hooks/use-settings"
import { getMembershipReportHeader, getMembershipReportRows } from "utils/report-utils"
import { useAsync } from "utils/use-async"

import DownloadButton from "./download-button"

function MemberhipReport() {
  const { data, isLoading, run } = useAsync()
  const { currentSeason } = useSettings()
  const client = useClient()

  React.useEffect(() => {
    run(client(`reports/membership/${currentSeason}/`))
  }, [run, client, currentSeason])

  const reportName = `${currentSeason}-membership-report.csv`
  const reportHeader = getMembershipReportHeader(currentSeason)
  const reportData = getMembershipReportRows(data)

  const getDownloadFile = () => {
    const rows = []
    rows.push(reportHeader.join(","))
    reportData?.forEach((row) => rows.push(row.join(",")))
    return rows.join("\r\n")
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-success">{currentSeason} Membership Report</h4>
        <DownloadButton data={getDownloadFile()} filename={reportName} />
        <div style={{ overflowY: "auto" }}>
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                {reportHeader.map((h) => (
                  <th key={h?.replace(" ", "-").toLowerCase()}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                reportData?.map((row, rx) => {
                  return (
                    <tr key={rx}>
                      {row.map((cell, cx) => {
                        return (
                          <td
                            key={`${cx}-${cell}`}
                            style={{
                              fontSize: ".9rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
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

export default MemberhipReport
