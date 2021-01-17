import React from "react"

import { useEventDocuments } from "hooks/document-hooks"

import { DocumentList } from "./document-list"

function EventDocuments({ clubEvent }) {
  const documents = useEventDocuments(clubEvent?.id)

  return (
    <DocumentList
      documents={documents}
      title="Event Documents"
      noResultMessage="No tee times or results have been uploaded."
    />
  )
}

export { EventDocuments }
