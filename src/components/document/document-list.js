import React from "react"

import { DocumentCard } from "components/document/document-card"

function DocumentList({ documents, title, noResultMessage }) {
  const hasDocuments = Boolean(documents) && documents.length > 0

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title text-primary">{title}</h4>
        <React.Fragment>
          {hasDocuments || <p>{noResultMessage}</p>}
          {hasDocuments && documents.map((doc) => <DocumentCard key={doc.id} document={doc} />)}
        </React.Fragment>
      </div>
    </div>
  )
}

export { DocumentList }
