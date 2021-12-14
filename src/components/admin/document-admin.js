import styled from "@emotion/styled/macro"

import React from "react"

import { AdminAction } from "components/button/admin-buttons"
import { StandardConfirmDialog } from "components/dialog/confirm"
import { DocumentCard } from "components/document/document-card"
import { useEventDocumentDelete } from "hooks/document-hooks"
import { toast } from "react-toastify"
import * as colors from "styles/colors"

const DocumentContainer = styled.div({
  position: "relative",
  padding: 0,
  margin: 0,
  minWidth: "240px",
  maxWidth: "420px",
})

function DocumentAdmin({ documents, title, noResultMessage, onAddNew }) {
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [idToDelete, setidToDelete] = React.useState(0)
  const deleteRef = React.useRef()
  const { mutate: deleteDocument } = useEventDocumentDelete()

  const hasDocuments = Boolean(documents) && documents.length > 0

  const handleDelete = (id) => {
    setidToDelete(id)
    setShowConfirm(true)
  }

  const handleDeleteConfirm = () => {
    setShowConfirm(false)
    deleteDocument(idToDelete, {
      onSuccess: () => {
        toast.warn("🪓 The select document has been deleted.")
      },
    })
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">{title}</h4>
        <React.Fragment>
          {hasDocuments || <p>{noResultMessage}</p>}
          {hasDocuments &&
            documents.map((doc) => (
              <DocumentContainer key={doc.id}>
                <AdminAction color={colors.red} label="Delete document" id={doc.id} onAction={handleDelete} />
                <DocumentCard document={doc} />
              </DocumentContainer>
            ))}
        </React.Fragment>
        <div style={{ display: "flex" }}>
          <button className="btn btn-sm btn-success mr-2" onClick={() => onAddNew("T")}>
            Tee Times
          </button>
          <button className="btn btn-sm btn-primary mr-2" onClick={() => onAddNew("R")}>
            Results
          </button>
          <button className="btn btn-sm btn-light mr-2" onClick={() => onAddNew("Z")}>
            Points
          </button>
          <button className="btn btn-sm btn-info" onClick={() => onAddNew("O")}>
            Other
          </button>
        </div>
      </div>
      {showConfirm && (
        <StandardConfirmDialog
          confirmRef={deleteRef}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  )
}

export { DocumentAdmin }
