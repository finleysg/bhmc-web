import React from "react"

import { DataDocument } from "components/document/data-document"
import { OverlaySpinner } from "components/spinners"
import { usePointsImport } from "hooks/admin-hooks"
import { CgImport } from "react-icons/cg"

function PointsAdmin({ clubEvent, documents, title, noResultMessage, onSelectDocument }) {
  const { mutate: importPoints, isLoading } = usePointsImport()
  const hasDocuments = Boolean(documents) && documents.length > 0

  const handleImport = (document) => {
    importPoints({
      eventId: clubEvent.id,
      documentId: document.id,
    })
    onSelectDocument(document)
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">{title}</h4>
        <OverlaySpinner loading={isLoading} />
        <React.Fragment>
          {hasDocuments || <p>{noResultMessage}</p>}
          {hasDocuments &&
            documents.map((doc) => (
              <DataDocument
                document={doc}
                onAction={handleImport}
                onSelect={onSelectDocument}
                icon={<CgImport />}
                selectLabel="Load points"
                actionLabel="Import season long points"
              />
            ))}
        </React.Fragment>
      </div>
    </div>
  )
}

export { PointsAdmin }
