import React from "react"

import { CardContent } from "components/content"
import { PlayerProfile } from "features/directory/public-profile"
import { PlayerSearch } from "features/directory/search"

function DirectoryPage() {
  const [selectedId, setSelectedId] = React.useState()

  const handleSelect = (player) => {
    setSelectedId(player.id)
  }

  return (
    <div className="content__inner">
      <header className="content__title">
        <h1>Member Directory</h1>
      </header>
      <div className="row">
        <div className="col-md-6">
          <CardContent contentKey="directory" title={false} />
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Player Search</h4>
              <p>
                Type to search for players. Click on a name to see the player card. Click on the
                star to add a player to your friends list.
              </p>
              <PlayerSearch onSelect={handleSelect} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <PlayerProfile playerId={selectedId} />
        </div>
      </div>
    </div>
  )
}

export default DirectoryPage
