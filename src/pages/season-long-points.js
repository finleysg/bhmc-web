import React from "react"

import { CardContent } from "components/card/content"
import { HistoricalDocuments } from "components/document/historical-documents"
import PointsTable from "components/points/points-table"
import * as colors from "styles/colors"
import * as config from "utils/app-config"

function SeasonLongPointsPage() {
  return (
    <div className="content__inner">
      <div className="row">
        <div className="col-xl-3 col-12">
          <HistoricalDocuments
            documentTypeCode="P"
            title="Current Season"
            includedSeason={config.currentSeason}
          />
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
          <HistoricalDocuments
            documentTypeCode="P"
            title="Past Seasons"
            excludedSeason={config.currentSeason}
          />
        </div>
      </div>
    </div>
  )
}

export default SeasonLongPointsPage
