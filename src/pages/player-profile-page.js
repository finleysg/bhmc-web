import React from "react"

import { PlayerProfile } from "features/directory/public-profile"
import { useParams } from "react-router-dom"

function PlayerProfilePage() {
  const { playerId } = useParams()

  return (
    <div className="content__inner">
      {/* <header className="content__title">
        <h1>About the Men's Club</h1>
      </header> */}
      <div className="row">
        <div className="col-12">
          <PlayerProfile playerId={+playerId} />
        </div>
      </div>
    </div>
  )
}

export default PlayerProfilePage
