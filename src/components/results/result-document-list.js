import React from "react"

import { DocumentList } from "components/document/document-list"
import { isAfter, isBefore } from "date-fns"
import { useDocuments } from "hooks/document-hooks"

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

  return (
    <DocumentList
      documents={filteredDocuments()}
      title={`${season} Results`}
      noResultMessage="No results yet for this season."
    />
  )
}

export { ResultDocumentList }
