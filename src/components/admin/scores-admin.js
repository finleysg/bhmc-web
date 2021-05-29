import React from "react"

import { DataDocument } from "components/document/data-document"
import { OverlaySpinner } from "components/spinners"
import { useScoresImport } from "hooks/admin-hooks"
import { CgImport } from "react-icons/cg"

function ScoresAdmin({ clubEvent, documents, title, noResultMessage }) {
  const [isImporting, setIsImporting] = React.useState(false)
  const [selectedDocument, setSelectedDocument] = React.useState()
  const { mutate: importScores, isLoading } = useScoresImport()
  const hasDocuments = Boolean(documents) && documents.length > 0

  const showImport = (document) => {
    setSelectedDocument(document)
    setIsImporting(true)
  }

  const handleImport = () => {
    importScores({
      eventId: clubEvent.id,
      documentId: selectedDocument.id,
    })
    setIsImporting(false)
  }

  return (
    <div>
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
                  onAction={showImport}
                  onSelect={showImport}
                  icon={<CgImport />}
                  selectLabel="Load scores"
                  actionLabel="Import hole by hole scores"
                />
              ))}
          </React.Fragment>
          {isImporting && (
            <>
              <button
                className="btn btn-light"
                type="button"
                style={{ marginLeft: ".5rem" }}
                onClick={() => setIsImporting(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                style={{ marginLeft: ".5rem" }}
                onClick={handleImport}
              >
                Import
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export { ScoresAdmin }
