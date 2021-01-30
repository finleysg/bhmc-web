import React from "react"

function RegistrationSlotPlayer(props) {
  const { slot, onRemovePlayer } = props

  return (
    <div className="player">
      {slot.playerId === 0 && <span className="text-primary">Add a player</span>}
      {slot.playerId !== 0 && (
        <>
          <span className="text-teal">{slot.playerName}</span>
          <span style={{ marginLeft: "1rem" }}>
            <button
              className="btn btn-link text-danger"
              style={{ padding: 0, border: "none", verticalAlign: "top" }}
              onClick={() => onRemovePlayer(slot)}
            >
              (remove)
            </button>
          </span>
        </>
      )}
    </div>
  )
}

export default RegistrationSlotPlayer
