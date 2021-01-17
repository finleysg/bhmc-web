import React from "react"

import { useAuth } from "context/auth-context"
import { useLowScores } from "hooks/player-hooks"
import { Link } from "react-router-dom"

function LowScoreRow({ playerScore }) {
  const { user } = useAuth()
  const { player, score } = playerScore

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
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
      <div>{score}</div>
    </div>
  )
}

function NoScores(props) {
  const { season } = props
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">{season} Low Scores</h4>
        <p>No low rounds recorded for this season.</p>
      </div>
    </div>
  )
}

function LowScoreList(props) {
  const { season } = props
  const lowScores = useLowScores(season)

  if (!lowScores || lowScores.length === 0) {
    return <NoScores season={season} />
  }

  const byCourse = lowScores.reduce((acc, value) => {
    // Group initialization
    if (!acc[value.course_name]) {
      acc[value.course_name] = []
    }

    // Grouping
    acc[value.course_name].push(value)

    return acc
  }, {})

  // convert object to key's array
  const courses = Object.keys(byCourse)

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">{season} Low Rounds</h4>
        {courses.map((name) => (
          <div key={name} style={{ padding: ".5rem" }}>
            <h5 className="text-indigo">{name}</h5>
            {byCourse[name].map((ps) => {
              return <LowScoreRow key={ps.id} playerScore={ps} />
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export { LowScoreList }
