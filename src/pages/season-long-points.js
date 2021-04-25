import React from "react"

import { CardContent } from "components/card/content"
import { HistoricalDocuments } from "components/document/historical-documents"
import PointsTable from "components/points/points-table"
import TopPoints from "components/points/top-points"
import { IndexTab, Tabs } from "components/tabs"
import * as colors from "styles/colors"
import * as config from "utils/app-config"

function SeasonLongPointsPage() {
  const [selectedCategory, updateSelectedCategory] = React.useState("Gross")

  return (
    <div className="content__inner">
      <div className="row">
        <div className="col-xl-3 col-12">
          <HistoricalDocuments
            documentTypeCode="P"
            title="Current Season"
            includedSeason={config.currentSeason}
          />
          <Tabs>
            <IndexTab
              key="gross"
              index={0}
              selectedIndex={selectedCategory === "Gross" ? 0 : 1}
              onSelect={() => updateSelectedCategory("Gross")}
            >
              Top 20 Gross
            </IndexTab>
            <IndexTab
              key="net"
              index={1}
              selectedIndex={selectedCategory === "Gross" ? 0 : 1}
              onSelect={() => updateSelectedCategory("Net")}
            >
              Top 20 Net
            </IndexTab>
          </Tabs>
          <TopPoints category={selectedCategory} topN={20} />
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
