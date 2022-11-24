import React from "react"

import { SolidIconActionButton } from "components/button/buttons"
import { useClient } from "context/auth-context"
import { AddPlayerForm } from "forms/add-player-form"
import Player from "models/player"
import Modal from "react-bootstrap/Modal"
import { MdAdd } from "react-icons/md"
import * as colors from "styles/colors"

function AddPlayer({ onAdd, ...rest }) {
  const [showAdd, setShowAdd] = React.useState(false)
  const client = useClient()

  const handleAdd = () => {
    setShowAdd(true)
  }

  const handleAddConfirm = (player) => {
    client("players", {
      method: "POST",
      data: player,
    })
      .then((playerData) => {
        setShowAdd(false)
        onAdd(new Player(playerData))
      })
      .catch((err) => {
        if (err?.message && err.message.indexOf("player with this Email already exists.") >= 0) {
          client(`player-search/?pattern=${player.email}`).then((players) => {
            setShowAdd(false)
            onAdd(new Player(players[0]))
          })
        } else if (
          err?.message &&
          err.message.indexOf("player with this GHIN already exists.") >= 0
        ) {
          client(`players/?ghin=${player.ghin}`).then((players) => {
            setShowAdd(false)
            onAdd(new Player(players[0]))
          })
        }
      })
  }

  return (
    <div {...rest}>
      <SolidIconActionButton onAction={handleAdd} color={colors.warning} label="Add a new player">
        <MdAdd />
      </SolidIconActionButton>
      <Modal show={showAdd} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title>Add a New Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPlayerForm onSubmit={handleAddConfirm} onCancel={() => setShowAdd(false)} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AddPlayer
