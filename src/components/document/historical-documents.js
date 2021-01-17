import React from "react"

import { useDocumentTypes } from "hooks/document-hooks"

import { DocumentList } from "./document-list"

function HistoricalDocuments(props) {
  const { documentTypeCode } = props
  const documents = useDocumentTypes(documentTypeCode)

  return <DocumentList documents={documents} title="Past Seasons" noResultMessage="loading..." />
}

export { HistoricalDocuments }
