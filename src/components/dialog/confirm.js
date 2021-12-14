import styled from "@emotion/styled/macro"
import { AlertDialog, AlertDialogDescription, AlertDialogLabel } from "@reach/alert-dialog"

import * as mq from "styles/media-queries"

const ConfirmAlertDialog = styled(AlertDialog)({
  maxWidth: "360px",
  margin: "20vh auto",
  [mq.mobile]: {
    width: "90vw",
    margin: "10vh auto",
  },
})

function StandardConfirmDialog({ confirmRef, onConfirm, onCancel, children }) {
  return (
    <ConfirmAlertDialog leastDestructiveRef={confirmRef}>
      <AlertDialogLabel>
        <h4 className="text-primary">Please Confirm!</h4>
      </AlertDialogLabel>
      <AlertDialogDescription style={{ padding: "1rem 0" }}>{children}</AlertDialogDescription>
      <div style={{ textAlign: "center" }} className="alert-buttons">
        <button style={{ marginRight: ".5rem" }} className="btn btn-primary" onClick={onConfirm}>
          Yes
        </button>
        <button style={{ marginLeft: ".5rem" }} className="btn btn-light" ref={confirmRef} onClick={onCancel}>
          No
        </button>
      </div>
    </ConfirmAlertDialog>
  )
}

export { ConfirmAlertDialog, StandardConfirmDialog }
