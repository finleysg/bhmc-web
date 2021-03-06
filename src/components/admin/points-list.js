import React from "react"

import { OverlaySpinner } from "components/spinners"
import { usePoints } from "hooks/admin-hooks"

function PointsList({ clubEvent }) {
  const { data: points, isLoading } = usePoints(clubEvent?.id)

  return (
    <div className="card">
      <div className="card-body">
        <OverlaySpinner loading={isLoading} />
        <h4 className="card-title text-success">Points Imported for this Event</h4>
        <div className="card-text">
          <div style={{ overflowY: "auto", overflowX: "auto" }}>
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Course / Flight</th>
                  <th>Gross Points</th>
                  <th>Net Points</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  points &&
                  points.map((row, rx) => {
                    return (
                      <tr key={rx}>
                        <td>
                          {row.player.first_name} {row.player.last_name}
                        </td>
                        <td>{row.additional_info}</td>
                        <td>{row.gross_points}</td>
                        <td>{row.net_points}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PointsList
