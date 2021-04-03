import React from "react"

import { useEventDocuments } from "hooks/document-hooks"

import { DocumentList } from "./document-list"

function EventDocuments({ clubEvent }) {
  const documents = useEventDocuments(clubEvent?.id)
  const filteredDocuments = documents?.filter((doc) => doc.documentType !== "Z") ?? []

  return (
    <DocumentList
      documents={filteredDocuments}
      title="Event Documents"
      noResultMessage="No files yet."
    />
  )
}

export { EventDocuments }
