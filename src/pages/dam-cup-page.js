import React from "react"

import { DamCupResults } from "features/damcup/dam-cup-results"
import { HistoricalDocuments, NoStandings } from "features/points/points-documents"
import * as colors from "styles/colors"

import DamCupLogo from "../assets/img/DamCup.png"
import DamCupTeam from "../assets/img/DamCupTeam2020.jpg"

function DamCupPage() {
  return (
    <div className="content__inner">
      <div className="row">
        <div className="col-xl-3 col-12">
          <NoStandings />
          <div className="card">
            <div className="card-header bg-teal">
              <span style={{ color: colors.white, fontSize: "1.2rem" }}>Past Results</span>
            </div>
            <div className="card-body">
              <DamCupResults />
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-12">
          <div className="card">
            <div className="card-body">
              <img src={DamCupLogo} alt="Dam Cup Logo" style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-success">Our 2020 Dam Cup Team</h4>
              <img
                src={DamCupTeam}
                alt="2020 Dam Cup Team"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-12">
          <HistoricalDocuments documentTypeCode="D" />
        </div>
      </div>
    </div>
  )
}

export default DamCupPage
