import React from "react"

import { CardContent } from "components/content"
import { PlayerSearch } from "features/directory/search"
import { useNavigate } from "react-router-dom"

function DirectoryPage() {
  const navigate = useNavigate()

  const handleSelect = (player) => {
    navigate(`/directory/${player.id}`, { target: "_blank" })
  }

  return (
    <div className="content__inner">
      <div className="row">
        <div className="col-md-6">
          <CardContent contentKey="directory">
            <PlayerSearch onSelect={handleSelect} />
          </CardContent>
        </div>
        <div className="col-md-6">{/* <PlayerProfile playerId={selectedId} /> */}</div>
      </div>
    </div>
  )
}

export default DirectoryPage
