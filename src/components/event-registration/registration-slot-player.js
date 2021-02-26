import React from "react"

function RegistrationSlotPlayer(props) {
  const { slot, onRemovePlayer } = props

  return (
    <div className="player">
      {slot.playerId === 0 && <span className="text-primary">Add a player</span>}
      {slot.playerId !== 0 && (
        <React.Fragment>
          <span className="text-teal">{slot.playerName}</span>
          {slot.slot > 0 && (
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
