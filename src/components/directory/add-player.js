import styled from "@emotion/styled/macro"
import { AlertDialog, AlertDialogDescription, AlertDialogLabel } from "@reach/alert-dialog"

import React from "react"

import { SolidIconActionButton } from "components/button/buttons"
import { useClient } from "context/auth-context"
import { AddPlayerForm } from "forms/add-player-form"
import Player from "models/player"
import { MdAdd } from "react-icons/md"
import * as colors from "styles/colors"
import * as mq from "styles/media-queries"

const AddPlayerDialog = styled(AlertDialog)({
  maxWidth: "360px",
  margin: "20vh auto",
  [mq.mobile]: {
    width: "90vw",
    margin: "10vh auto",
  },
})

function AddPlayer({ onAdd, ...rest }) {
  const addRef = React.useRef()
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
      {showAdd && (
        <AddPlayerDialog leastDestructiveRef={addRef}>
          <AlertDialogLabel>
            <h4 className="text-primary">Add a New Player</h4>
          </AlertDialogLabel>
          <AlertDialogDescription style={{ padding: "1rem 0" }}>
            <AddPlayerForm onSubmit={handleAddConfirm} onCancel={() => setShowAdd(false)} />
          </AlertDialogDescription>
        </AddPlayerDialog>
      )}
    </div>
  )
}

export default AddPlayer
