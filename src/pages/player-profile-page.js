import React from "react"

import { PlayerProfile } from "components/directory/public-profile"
import { useAuth } from "context/auth-context"
import { useNavigate, useParams } from "react-router-dom"

function PlayerProfilePage() {
  const { user } = useAuth()
  const { playerId } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!user?.is_authenticated) {
      navigate("/home")
    }
  }, [user, navigate])

  return (
    <div className="content__inner">
      <div className="row">
        <div className="col-12">
          <PlayerProfile playerId={+playerId} />
        </div>
      </div>
    </div>
  )
}

export default PlayerProfilePage
