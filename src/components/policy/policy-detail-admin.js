import "@reach/dialog/styles.css"

import { AlertDialog, AlertDialogDescription, AlertDialogLabel } from "@reach/alert-dialog"

import React from "react"

import { MarkdownField } from "components/field/markdown-field"
import { TextField } from "components/field/text-field"
import { useClient } from "context/auth-context"
import { usePermission } from "context/permission-context"
import { IconContext } from "react-icons"
import { MdCancel, MdDeleteForever, MdEdit, MdSave } from "react-icons/md"
import { queryCache, useMutation } from "react-query"
import * as colors from "styles/colors"

function Actions(props) {
  const { mode, onCancel, onDelete, onEdit, onSave } = props
  return (
    <IconContext.Provider value={{ color: colors.yellow }}>
      {mode === "view" && (
        <div className="actions">
          <button onClick={onDelete} className={`actions__item bg-transparent`}>
            <i>
              <MdDeleteForever />
            </i>
          </button>
          <button onClick={onEdit} className={`actions__item bg-transparent`}>
            <i>
              <MdEdit />
            </i>
          </button>
        </div>
      )}
      {mode === "edit" && (
        <div className="actions">
          <button onClick={onSave} className={`actions__item bg-transparent`}>
            <i>
              <MdSave />
            </i>
          </button>
          <button onClick={onCancel} className={`actions__item bg-transparent`}>
            <i>
              <MdCancel />
            </i>
          </button>
        </div>
      )}
    </IconContext.Provider>
  )
}

function PolicyDetailAdmin({ policy }) {
  const [mode, setMode] = React.useState("view")
  const [data, setData] = React.useState(policy)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const cancelRef = React.useRef()
  const client = useClient()
  const { canEdit } = usePermission()

  const [update] = useMutation(
    (updates) =>
      client(`api/policies/${updates.id}/`, {
        method: "PUT",
        data: updates,
      }),
    { onSettled: () => queryCache.invalidateQueries("policies") },
  )

  const [remove] = useMutation(({ id }) => client(`api/policies/${id}/`, { method: "DELETE" }), {
    onSettled: () => queryCache.invalidateQueries("policies"),
  })

  const handleCancel = () => {
    setData(policy)
    setMode("view")
  }

  const handleChange = (value) => {
    const { source, content } = value
    const currentData = { ...data }
    if (source === "markdown") {
      currentData.description = content
    } else {
      currentData.title = content
    }
    setData(currentData)
  }

  const handleDelete = () => {
    remove(policy)
    setShowConfirm(false)
  }

  const handleSave = () => {
    update(data)
    setMode("view")
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">
          <TextField text={data.title} mode={mode} onChange={handleChange} />
        </h4>
        {/* <h6 className="card-subtitle">{{ cardSubTitle }}</h6> */}

        {canEdit && (
          <Actions
            mode={mode}
            onEdit={() => setMode("edit")}
            onCancel={handleCancel}
            onSave={handleSave}
            onDelete={() => setShowConfirm(true)}
          />
        )}
        {canEdit && showConfirm && (
          <AlertDialog leastDestructiveRef={cancelRef}>
            <AlertDialogLabel>Please Confirm!</AlertDialogLabel>
            <AlertDialogDescription>Are you sure you want to delete this policy?</AlertDialogDescription>
            <div className="alert-buttons">
              <button onClick={handleDelete}>Delete</button>{" "}
              <button ref={cancelRef} onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
            </div>
          </AlertDialog>
        )}
        <div className="card-text">
          <MarkdownField text={data.description} mode={mode} onChange={handleChange} />
        </div>
      </div>
    </div>
  )
}

export { PolicyDetailAdmin }
