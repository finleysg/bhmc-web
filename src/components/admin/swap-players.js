import { useState } from "react"

import PeoplePicker from "components/directory/people-picker"
import { Modal } from "react-bootstrap"

export default function SwapPlayer({ clubEvent, selectedSlot, showSwap, onSwap, onCancel }) {
  const [newPlayer, setNewPlayer] = useState(null)

  const handleSelect = (player) => {
    setNewPlayer(player)
  }

  const handleSwap = () => {
    onSwap(newPlayer)
    setNewPlayer(null)
  }

  return (
    <Modal show={showSwap} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <Modal.Title>Swap for {selectedSlot?.playerName}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "2rem" }}>
        <PeoplePicker allowNew={false} clubEvent={clubEvent} onSelect={handleSelect} />
        <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
          Selected player: {newPlayer ? newPlayer.name : "none selected"}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-light mr-2" onClick={onCancel}>
          Cancel
        </button>
        <button disabled={!newPlayer} className="btn btn-danger" onClick={handleSwap}>
          Confirm Swap
        </button>
      </Modal.Footer>
    </Modal>
  )
}
