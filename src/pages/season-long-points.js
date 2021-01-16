import React from "react"

import { CardContent } from "components/content"
import { HistoricalDocuments, NoStandings } from "features/points/points-documents"
import PointsTable from "features/points/points-table"
import * as colors from "styles/colors"

function SeasonLongPointsPage() {
  return (
    <div className="content__inner">
      <div className="row">
        <div className="col-xl-3 col-12">
          <NoStandings />
        </div>
        <div className="col-xl-6 col-12">
          <CardContent contentKey="season-long-points" />
          <div className="card">
            <div className="card-header bg-light-blue">
              <span style={{ color: colors.white, fontSize: "1.2rem" }}>
                Points Breakdown by Event
              </span>
            </div>
            <div className="card-body">
              <PointsTable />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-12">
          <HistoricalDocuments documentTypeCode="P" />
        </div>
      </div>
    </div>
  )
}

export default SeasonLongPointsPage
