import React from "react"

import { useAuth } from "context/auth-context"
import { useChampions } from "hooks/player-hooks"
import { Link } from "react-router-dom"

function ChampionRow({ champion }) {
  const { user } = useAuth()
  const { flight, player, score } = champion

  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".5rem" }}>
      <div style={{ flex: "1 1 50%" }}>{flight}</div>
      <div style={{ flex: "1 1 35%" }}>
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
      <div style={{ flex: "1 1 15%" }}>{score}</div>
    </div>
  )
}

function NoChampions(props) {
  const { season } = props
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">{season} Major Champions</h4>
        <p>No information for this season.</p>
      </div>
    </div>
  )
}

function ChampionList(props) {
  const { season } = props
  const champions = useChampions(season)

  if (!champions || champions.length === 0) {
    return <NoChampions season={season} />
  }

  const championsByEvent = champions.reduce((acc, value) => {
    // Group initialization
    if (!acc[value.event_name]) {
      acc[value.event_name] = []
    }

    // Grouping
    acc[value.event_name].push(value)

    return acc
  }, {})

  // convert object to key's array
  const eventNames = Object.keys(championsByEvent)

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">{season} Major Champions</h4>
        {eventNames.map((name) => (
          <div key={name} style={{ padding: ".5rem" }}>
            <h5 className="text-indigo">{name}</h5>
            {championsByEvent[name].map((c) => {
              return <ChampionRow key={c.id} champion={c} />
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export { ChampionList }
