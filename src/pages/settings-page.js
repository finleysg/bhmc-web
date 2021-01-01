import React from "react"

import MyCards from "features/account/my-cards"
import MyEvents from "features/account/my-events"
import { MyFriends } from "features/account/my-friends"
import { PlayerProfile } from "features/directory/public-profile"

function SettingsPage() {
  const [selectedId, setSelectedId] = React.useState()

  const handleSelect = (player) => {
    setSelectedId(player.id)
  }
  return (
    <div className="content__inner">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-12">
          <MyEvents />
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <MyFriends onSelect={handleSelect} />
          {selectedId && <PlayerProfile playerId={selectedId} />}
        </div>
        <div className="col-lg-4 col-md-6 col-12">
          <MyCards />
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
