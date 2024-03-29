import React from "react"

import { CardContent } from "components/card/content"
import { HistoricalDocuments } from "components/document/historical-documents"
import { StaticDocument } from "components/document/static-document"
import PointsTable from "components/points/points-table"
import TopPoints from "components/points/top-points"
import { IndexTab, Tabs } from "components/tabs"
import { useSettings } from "hooks/use-settings"
import * as colors from "styles/colors"

function SeasonLongPointsPage() {
  const { currentSeason } = useSettings()
  const [selectedCategory, updateSelectedCategory] = React.useState("Gross")

  return (
    <div className="content__inner">
      <div className="row">
        <div className="col-xl-3 col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="text-primary" style={{ marginBottom: "1rem" }}>
                Current Standings
              </h4>
              <StaticDocument code="SLPG" documentType="P" />
              <StaticDocument code="SLPN" documentType="P" />
            </div>
          </div>
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
            excludedSeason={currentSeason}
          />
        </div>
      </div>
    </div>
  )
}

export default SeasonLongPointsPage
