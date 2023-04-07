import React from "react"

function RegistrationSlotPlayer(props) {
  const { slot, mode, team, onRemovePlayer } = props

  return (
    <div className="player">
      {mode === "new" && slot.playerId === 0 && <span className="text-primary">Add a player</span>}
      {slot.playerId !== 0 && (
        <React.Fragment>
          <span className="text-teal">{slot.playerName}</span>
          {team > 0 && (
            <span style={{ marginLeft: "1rem", fontWeight: "bold" }} className="text-muted">
              Team {team}
            </span>
          )}
          {mode === "new" && slot.slot > 0 && (
            <span style={{ marginLeft: "1rem" }}>
              <button
                className="btn btn-link text-danger"
                style={{ padding: 0, border: "none", verticalAlign: "top" }}
                onClick={() => onRemovePlayer(slot)}
              >
                (remove)
              </button>
            </span>
          )}
        </React.Fragment>
      )}
    </div>
  )
}

export default RegistrationSlotPlayer
