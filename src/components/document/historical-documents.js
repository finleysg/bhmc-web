import React from "react"

import { useDocumentTypes } from "hooks/document-hooks"

import { DocumentList } from "./document-list"

function HistoricalDocuments(props) {
  const { documentTypeCode, includedSeason, excludedSeason } = props
  const title = props.title ?? "Past Seasons"
  const documents = useDocumentTypes(documentTypeCode)

  const getDocuments = () => {
    if (includedSeason) {
      return documents.filter((doc) => doc.year === includedSeason)
    } else if (excludedSeason) {
      return documents.filter((doc) => doc.year !== excludedSeason)
    } else {
      return documents
    }
  }
  return <DocumentList documents={getDocuments()} title={title} noResultMessage="No documents found" />
}

export { HistoricalDocuments }
