import React from "react"

import { DocumentCard } from "components/registration"
import { LoadingSpinner } from "components/spinners"
import { useDocumentTypes } from "hooks/document-hooks"

function NoStandings(props) {
  const { season } = props
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">{season} Standings</h4>
        <p>No points yet for this season.</p>
      </div>
    </div>
  )
}

function HistoricalDocuments(props) {
  const { documentTypeCode } = props
  const documents = useDocumentTypes(documentTypeCode)

  if (documents?.length > 0) {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-primary">Past Seasons</h4>
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      </div>
    )
  } else {
    return <LoadingSpinner loading={true} />
  }
}

export { HistoricalDocuments, NoStandings }
