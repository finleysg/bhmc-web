import React from "react"

import { ChampionList } from "./champion-list"
import { LowScoreList } from "./low-score-list"
import { ResultDocumentList } from "./result-document-list"

const eventTypeCode = (eventType) => {
  switch (eventType) {
    case "weeknight-events":
      return "N"
    case "weekend-majors":
      return "W"
    default:
      return "O"
  }
}

function ResultDetail({ eventType, season }) {
  return (
    <div className="row">
      <div className="col-lg-4 col-md-6 col-12">
        <ResultDocumentList eventType={eventTypeCode(eventType)} season={season} />
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        {eventType === "weeknight-events" && <LowScoreList season={season} />}
        {eventType === "weekend-majors" && <ChampionList season={season} />}
      </div>
      <div className="col-lg-4 col-md-6 col-12">{/* TODO: pictures */}</div>
    </div>
  )
}

export default ResultDetail
