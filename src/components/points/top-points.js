import React from "react"

import { OverlaySpinner } from "components/spinners"
import { useTopPoints } from "hooks/player-hooks"

function TopPoints({ category, topN }) {
  const { data: points, isLoading } = useTopPoints(category, topN)

  return (
    <div className="card">
      <div className="card-body">
        <OverlaySpinner loading={isLoading} />
        {/* <h4 className="card-title text-success">
          Top {topN} {category}
        </h4> */}
        <div className="card-text">
          <div style={{ overflowY: "auto", overflowX: "auto" }}>
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  points &&
                  points.map((row) => {
                    return (
                      <tr key={row.id}>
                        <td>
                          {row.first_name} {row.last_name}
                        </td>
                        <td>{row.total_points}</td>
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

export default TopPoints
