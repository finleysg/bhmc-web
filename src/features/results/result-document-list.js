import React from "react"

import { DocumentCard } from "components/registration"
import { isAfter, isBefore } from "date-fns"
import { useDocuments } from "hooks/document-hooks"

function NoResults(props) {
  const { season } = props
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">{season} Results</h4>
        <p>No results yet for this season.</p>
      </div>
    </div>
  )
}

function ResultDocumentList({ eventType, season }) {
  const documents = useDocuments("R", season)

  const filteredDocuments = () => {
    return documents
      .filter((doc) => doc.eventTypeCode() === eventType)
      .sort((a, b) => {
        if (isBefore(a.lastUpdate, b.lastUpdate)) {
          return -1
        }
        if (isAfter(a.lastUpdate, b.lastUpdate)) {
          return 1
        }
        return 0
      })
  }

  if (filteredDocuments()?.length > 0) {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-primary">{season} Results</h4>
          {filteredDocuments().map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      </div>
    )
  } else {
    return <NoResults season={season} />
  }
}

export { ResultDocumentList }
