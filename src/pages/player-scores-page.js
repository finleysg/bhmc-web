import { PlayerScores } from "components/results/player-scores"
import { Tab, Tabs } from "components/tabs"
import { useParams } from "react-router-dom"

import { SeasonMenu } from "./results-page"

function PlayerScoresPage() {
  const { scoreType, season } = useParams()

  return (
    <div className="content__inner">
      <SeasonMenu baseUrl={`/my-scores/${scoreType}`} season={season} startAt={2021} />
      <div>
        <Tabs>
          <Tab to={`/my-scores/gross/${season}`}>Gross Scores</Tab>
          <Tab to={`/my-scores/net/${season}`}>Net Scores</Tab>
        </Tabs>
        <PlayerScores isNet={scoreType === "net"} season={season} />
      </div>
    </div>
  )
}

export default PlayerScoresPage
