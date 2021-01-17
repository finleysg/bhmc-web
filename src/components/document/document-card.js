import styled from "@emotion/styled/macro"

import React from "react"

import { format } from "date-fns"
import { FiFileText } from "react-icons/fi"
import * as colors from "styles/colors"

const DocumentDetail = styled.div({
  border: `1px solid ${colors.gray300}`,
  display: "flex",
  alignItems: "center",
  padding: "1rem",
  margin: "1rem 0",
  minWidth: "240px",
  maxWidth: "420px",
  overflow: "hidden",
})

const DocumentTitle = styled.p({
  marginBottom: ".3rem",
  fontWeight: "bold",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
})

const DocumentDate = styled.p({
  marginBottom: 0,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
})

const cardColor = (documentType) => {
  switch (documentType) {
    case "R":
      return "text-indigo"
    case "T":
      return "text-teal"
    case "F":
      return "text-green"
    case "P":
    case "D":
      return "text-light-blue"
    default:
      return "text-blue-gray"
  }
}

function DocumentCard({ document, ...rest }) {
  return (
    <a href={document.file} target="_blank" rel="noreferrer" alt={document.title}>
      <DocumentDetail {...rest}>
        <div className={cardColor(document.documentType)} style={{ marginRight: "1rem" }}>
          <FiFileText style={{ fontSize: "3rem" }} />
        </div>
        <div style={{ overflow: "hidden" }}>
          <DocumentTitle className={cardColor(document.documentType)} title={document.title}>
            {document.title}
          </DocumentTitle>
          <DocumentDate title={format(document.lastUpdate, "MMMM d, yyyy h:mm aaaa")}>
            <small className="text-muted">
              Updated: {format(document.lastUpdate, "MMMM d, yyyy h:mm aaaa")}
            </small>
          </DocumentDate>
        </div>
      </DocumentDetail>
    </a>
  )
}

export { DocumentCard }
