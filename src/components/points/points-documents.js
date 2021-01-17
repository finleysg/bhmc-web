import React from "react"

function NoStandings(props) {
  const { season } = props
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">{season} Standings</h4>
        <p>No points yet for this season.</p>
      </div>
    </div>
  )
}

export { NoStandings }
