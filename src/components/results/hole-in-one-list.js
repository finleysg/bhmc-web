import React from "react"

import { useAuth } from "context/auth-context"
import { useAces } from "hooks/player-hooks"
import { Link } from "react-router-dom"

function HoleInOneRow({ ace }) {
  const { user } = useAuth()
  const { player, hole_name, shot_date } = ace

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>{shot_date}</div>
      <div style={{ textAlign: "left" }}>
        {user?.is_authenticated ? (
          <Link to={`/directory/${player.id}`}>
            {player.first_name} {player.last_name}
          </Link>
        ) : (
          <span>
            {player.first_name} {player.last_name}
          </span>
        )}
      </div>
      <div>{hole_name}</div>
    </div>
  )
}

function HoleInOneList(props) {
  const { season } = props
  const aces = useAces(season)

  if (!aces || aces.length === 0) {
    return (
      <h5 className="text-primary">
        No great shots yet for this season. <small>(It only takes one good swing!)</small>
      </h5>
    )
  }

  return aces.map((ace) => (
    <div key={ace.id} style={{ padding: ".5rem" }}>
      <HoleInOneRow ace={ace} />
    </div>
  ))
}

export { HoleInOneList }
