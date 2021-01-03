import React from "react"

import { CardContent } from "components/content"
import { useAuth } from "context/auth-context"
import { PlayerSearch } from "features/directory/search"
import { useNavigate } from "react-router-dom"

function DirectoryPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSelect = (player) => {
    navigate(`/directory/${player.id}`, { target: "_blank" })
  }

  React.useEffect(() => {
    if (!user?.is_authenticated) {
      navigate("/home")
    }
  }, [user, navigate])

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
