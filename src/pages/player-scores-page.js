import { PlayerScores } from "components/results/player-scores"
import { Tab, Tabs } from "components/tabs"
import { useParams } from "react-router-dom"

function PlayerScoresPage() {
  const { scoreType } = useParams()

  return (
    <div className="content__inner">
      <div>
        <Tabs>
          <Tab to={`/my-scores/gross`}>Gross Scores</Tab>
          <Tab to={`/my-scores/net`}>Net Scores</Tab>
        </Tabs>
        <PlayerScores isNet={scoreType === "net"} />
      </div>
    </div>
  )
}

export default PlayerScoresPage
