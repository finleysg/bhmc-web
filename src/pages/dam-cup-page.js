import React from "react"

import { CardContent } from "components/card/content"
import { DamCupResults } from "components/damcup/dam-cup-results"
import { HistoricalDocuments } from "components/document/historical-documents"
import { StaticDocument } from "components/document/static-document"
import { PhotoUploader } from "components/photo/photo-uploader"
// import DamCupTeam from "../assets/img/TheTeam.jpg"
import { RandomPicList } from "components/photo/random-pic-list"
import { NavLink } from "react-router-dom"
import * as colors from "styles/colors"

import DamCupLogo from "../assets/img/DamCup.png"

function DamCupPage() {
  return (
    <div className="content__inner">
      <div className="row">
        <div className="col-xl-3 col-12">
          <div className="card">
            <div className="card-header bg-teal">
              <span style={{ color: colors.white, fontSize: "1.2rem" }}>Current Standings</span>
            </div>
            <div className="card-body">
              <StaticDocument code="CUP" documentType="D" />
            </div>
          </div>
          <div className="card">
            <div className="card-header bg-teal">
              <span style={{ color: colors.white, fontSize: "1.2rem" }}>Past Results</span>
            </div>
            <div className="card-body">
              <img src={DamCupLogo} alt="Dam Cup Logo" style={{ width: "100%", height: "auto" }} />
              <DamCupResults />
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-12">
          <CardContent contentKey="dam-cup">
            <>
              <PhotoUploader defaultTags={["Dam Cup"]} />
              <RandomPicList tag="Dam Cup" take={2} />
              <NavLink to="/gallery?tag=Dam Cup">Go to the Dam Cup photo gallery</NavLink>
            </>
          </CardContent>
        </div>
        <div className="col-xl-3 col-12">
          <HistoricalDocuments documentTypeCode="D" />
        </div>
      </div>
    </div>
  )
}

export default DamCupPage
